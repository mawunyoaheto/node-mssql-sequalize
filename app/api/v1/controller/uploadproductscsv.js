const db = require('../models');
var dbConfig = require('../../../../config');
const Products = db.products;
const ItemBaseUnit = require('./itembaseunits');
const ProductCategory = require('./product_categories');
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
var respBody = require('../util/response');
const Response = require('../util/response');

const fs = require("fs");
const fastcsv = require("fast-csv");
const uploadFile = require('../util/upload');


const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;
var productsRes = {};

exports.uploadProducts = async (req, res, done) => {

  var resp = new Response.Response(res);

  try {

    transaction = await db.sequelize.transaction();
    const promises = [];
    await uploadFile.uploadFileMiddleware(req, res);

    if (req.file == undefined) {

      productsRes = respBody.ResponseBody('failed', 'Please upload a CSV file!', '');
      resp.json(400, productsRes);
    }

    //console.log("Uploaded the file successfully: " + req.file.originalname)
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.originalname;

    var csvData = [];
    var stream = fs.createReadStream(path);

    var csvStream = fastcsv
      //.parse()
      .parseStream(stream, { headers: true })
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", async function () {

        // remove the first line: header
        csvData.shift();
        fs.unlinkSync(path);


        try {


          for (i = 2; i < csvData.length; i++) {

            var itemBaseID = 100;
            var productCatID = 101;


            //console.log(csvData[i]['baseunit'])
            var itemBase = await ItemBaseUnit.findOneByDescription(csvData[i]['baseunit']);
            if (itemBase.count > 0) {
              itemBaseID = itemBase.rows[0].id;
              //console.log('basID:',itemBaseID)
            }
            const prodCat = await ProductCategory.findOneByDescription(csvData[i]['category']);
            if (prodCat.count > 0) {
              productCatID = prodCat.rows[0].id;
            }

            const productsQuery = {
              description: csvData[i]['description'],
              extended_description: csvData[i]['ext_description'],
              product_code: csvData[i]['product_code'],
              cost_price: csvData[i]['cost_price'],
              s_price: csvData[i]['s_price'],
              categoryid: productCatID,
              baseunit_id: itemBaseID,
              create_userid: userid,
              usermachinename: userMachineName,
              usermachineip: userMachineIP

            }

            //var products = await Products.create(productsQuery, { transaction });
            promises.push(await Products.create(productsQuery, { transaction }
            ).catch(err => {
              productsRes = respBody.ResponseBody('failed', '', 'Some error occurred while creating Products: ' + helper.parseError(err.message));
              resp.json(400, productsRes);
            }))

      }
          Promise.all(promises);
          await transaction.commit();

          productsRes = respBody.ResponseBody('success', '', "inserted " + res.rowCount + " row:");
          resp.json(201, productsRes);
        } catch (error) {

          await transaction.rollback();
          console.log(err.stack);
          fs.unlinkSync(path);
          productsRes = respBody.ResponseBody('failed', '',err.stack);
          resp.json(400, productsRes);

        }

        finally {

          done();
        }
      });
    stream.pipe(csvStream);
  } catch (err) {

    await transaction.rollback();
    productsRes = respBody.ResponseBody('failed', 'Could not upload the file:', 'failed with error: ' + err);
    resp.json(500, productsRes);
  }
};

function validateCsvData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`
    }
  }
  return;
}

function validateCsvRow(row) {
  if (!row[0]) {
    return "invalid name"
  }
  else if (!Number.isInteger(Number(row[1]))) {
    return "invalid roll number"
  }
  else if (!moment(row[2], "YYYY-MM-DD").isValid()) {
    return "invalid date of birth"
  }
  return;
}

function writeToCSVFile(users) {
  const filename = 'output.csv';
  fs.writeFile(filename, extractAsCSV(users), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

function extractAsCSV(users) {
  const header = ["Username, Password, Roles"];
  const rows = users.map(user =>
    `${user.username}, ${user.password}, ${user.roles}`
  );
  return header.concat(rows).join("\n");
}

//   const readCSV = await csvToJson({
//     trim:true
// }).fromFile(path);

// // Code executes after recipients are fully loaded.
// readCSV.forEach((readCSV) => {
//   csvData.push(readCSV);

// });


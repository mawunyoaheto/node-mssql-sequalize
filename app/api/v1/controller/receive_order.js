const db = require('../models');
var dbConfig = require('../../../../config');
const Receival = db.orderreceivals;
const ReceivalLines = db.receivallines;
const ProductStock = db.productsstock;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var ordersReceivalResp = {};

exports.receiveOrder = async (req, res) =>{

    var resp = new Response.Response(res);
   
      let transaction;

          // Receive Order
    const receivalSummary = {
        orderid: req.body.orderID,
        receivedate: req.body.receivedDate,
        waybillno: req.body.wayBillNo,
        srano: req.body.sraNo,
        receivalno: req.body.receivalNo,
        remarks: req.body.remarks,
        linestotal: req.body.percentage,
        totalvalue: req.body.vatID,
        outletid: req.body.outletID,
        archived: req.body.archived,
        create_userid: userid,
        usermachinename: userMachineName,
        usermachineip: userMachineIP
      };

          let receival;
          try {
            transaction = await db.sequelize.transaction();

            receival = await Receival.create(receivalSummary, { transaction } );

            const promises = [];

            for  (var i=0;i<req.body.details.length; i++) {

              const details = {

               orderlineid: req.body.details[i].orderlineid,
                productid: req.body.details[i].productID,
                itemunitid: req.body.details[i].unitID,
                itembaseid: req.body.details[i].baseItemID,
                qtyreceived: req.body.details[i].qty,
                unitcost: req.body.details[i].unitCost,
                batchno: req.body.details[i].batchNo,
                expirydate: req.body.details[i].expiryDate,
                linetotalcost: lineTotalCost,
                remarks: req.body.details[i].remarks,
                outletid: req.body.outletID,
                create_userid: userid,
                usermachinename: userMachineName,
                usermachineip: userMachineIP
              };

              const stockDetails = {

                 productid: req.body.details[i].productID,
                 stocklevel: req.body.details[i].unitID,
                 qty: req.body.details[i].qty,
                 batchno: req.body.details[i].batchNo,
                 expirydate: req.body.details[i].expiryDate,
                 unitcost: req.body.details[i].unitCost,
                 outletid: req.body.outletID,
                 baseunit_id: req.body.details[i].baseItemID,
                 actualstocklevel: req.body.details[i].unitID,
                 reorderlevel: req.body.details[i].unitID,
                 eoq: req.body.details[i].unitID,
                 averageconsumption: lineTotalCost,
                 leadtime: req.body.details[i].remarks,
                 minstocklevel: req.body.details[i].remarks,
                 maxstocklevel: req.body.details[i].remarks,
                 transactionid: req.body.details[i].remarks,
                 stageid: req.body.details[i].remarks,
                 statusid: req.body.details[i].remarks,
                 issuerid: userid,
                 receiverid: userid,
                 issuerid: userid,
                 usermachinename: userMachineName,
                 usermachineip: userMachineIP
               };

              promises.push(await ReceivalLines.create({details},{ transaction }
                ).catch(err => {
                ordersReceivalResp = respBody.ResponseBody('failed', '', 'Some error occurred while receiving orderlines: ' + helper.parseError(err.message));
                resp.json(400, ordersReceivalResp);
                })
              );
              promises.push(await ProductStock.create({stockDetails},{ transaction }
                ).catch(err => {
                ordersReceivalResp = respBody.ResponseBody('failed', '', 'Some error occurred while updating product stock: ' + helper.parseError(err.message));
                resp.json(400, ordersReceivalResp);
                })
              );
            }

            Promise.all(promises);
            await transaction.commit();

            taxResp = respBody.ResponseBody('success', data,' created');
            resp.json(201, taxResp);

          } catch (error) {

           await transaction.rollback();
  
            ordersReceivalResp = respBody.ResponseBody('failed', '', 'Some error occurred while receiving order: ' + helper.parseError(error.message));
            resp.json(400, ordersReceivalResp);

          }



  }

  exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    await Products.findAll({ where: condition })
        .then(data => {
            productsResp = respBody.ResponseBody('success', data, ' record(s) found');
            resp.json(200, productsResp);
        })
        .catch(err => {
            productsResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Products: ' + helper.parseError(err));
            resp.json(500, productsResp);

        });
};
const db = require('../models');
var dbConfig = require('../../../../config');
const Orders = db.orders;
const Orderlines = db.orderlines;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var ordersResp = {};

exports.createOrder = async (req, res) =>{

    var resp = new Response.Response(res);
   
      let transaction;

          // Create aan Order
    const orderSummary = {
        invoiceno: req.body.invoiceNum,
        awardno: req.body.awardNo,
        linestotal: req.body.supplierID,
        totalvalue: req.body.discount,
        supplierid: req.body.supplierID,
        discount: req.body.percentage,
        vatid: req.body.vatID,
        orderterms: req.body.orderTerms,
        ordercomments: req.body.orderComments,
        outletid: req.body.outletID,
        stageid: req.body.stageID,
        statusid: req.body.statusID,
        orderdate: req.body.orderDate,
        archived: req.body.archived,
        create_userid: req.body.percentage,
        create_userid: userid,
        usermachinename: userMachineName,
        usermachineip: userMachineIP
      };

          let order;
          try {
            transaction = await db.sequelize.transaction();

            order = await Orders.create(orderSummary, { transaction } );

            const promises = [];

            for  (var i=0;i<req.body.orderdetails.length; i++) {

              const orderDetails = {
               // orderid: order.,
                productid: req.body.orderdetails[i].itemID,
                itemunitid: req.body.orderdetails[i].itemUnitID,
                quantity: req.body.orderdetails[i].qty,
                unitcost: req.body.orderdetails[i].unitCost,
                linetotalcost: lineTotalCost,
                stocklevel: req.body.orderdetails[i].stockLevel,
                reorderlevel: req.body.orderdetails[i].reOrderLevel,
                approvedqty: req.body.orderdetails[i].remark,
                remarks: req.body.orderdetails[i].remark,
                approvallevelid: req.body.orderdetails[i].approvaLevelID,
                stageid: req.body.orderdetails[i].stageID,
                statusid: req.body.orderdetails[i].statusID,
                archived: req.body.percentage,
                create_userid: userid,
                usermachinename: userMachineName,
                usermachineip: userMachineIP
              };

            //   const prod = await Product.findByPk(prodId, { transaction });
            //   promises.push(prod);

              promises.push(await Orderlines.create({orderDetails},{ transaction }
                ).catch(err => {
                ordersResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Tax: ' + helper.parseError(err.message));
                resp.json(400, ordersResp);
                })
              );
            }

            Promise.all(promises);
            await transaction.commit();

            taxResp = respBody.ResponseBody('success', data,' created');
            resp.json(201, taxResp);

          } catch (error) {

           await transaction.rollback();
            //return next(error);
            ordersResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Tax: ' + helper.parseError(error.message));
            resp.json(400, ordersResp);

          }
        // eslint-disable-next-line no-empty


  }
const db = require('../models');
var dbConfig = require('../../../../config');
const Approval = db.orderapprovals;
const ApprovalLines = db.approvallines;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var ordersApprovalResp = {};

exports.createOrder = async (req, res) =>{

    var resp = new Response.Response(res);
   
      let transaction;

          // Approve Order
    const approvalSummary = {
        orderid: req.body.invoiceNum,
        approverid: req.body.approverid,
        approvalnumber: req.body.approvalnumber,
        approvallevelid: req.body.approvallevelid,
        remark: req.body.remark,
        linestotal: req.body.percentage,
        totalvalue: req.body.vatID,
        stageid: req.body.stageID,
        statusid: req.body.statusID,
        archived: req.body.archived,
        create_userid: req.body.percentage,
        create_userid: userid,
        usermachinename: userMachineName,
        usermachineip: userMachineIP
      };

          let order;
          try {
            transaction = await db.sequelize.transaction();

            order = await Approval.create(approvalSummary, { transaction } );

            const promises = [];

            for  (var i=0;i<req.body.approvaldetails.length; i++) {

              const approvalDetails = {
               // orderid: order.,
               orderlineid: req.body.approvalDetails[i].orderlineid,
                productid: req.body.approvalDetails[i].itemID,
                itemunitid: req.body.approvalDetails[i].itemUnitID,
                approvedqty: req.body.approvalDetails[i].qty,
                unitcost: req.body.approvalDetails[i].unitCost,
                linetotalcost: lineTotalCost,
                stocklevel: req.body.approvalDetails[i].stockLevel,
                reorderlevel: req.body.approvalDetails[i].reOrderLevel,
                approvedqty: req.body.approvalDetails[i].remark,
                remarks: req.body.approvalDetails[i].remark,
                stageid: req.body.approvalDetails[i].stageID,
                statusid: req.body.approvalDetails[i].statusID,
                archived: req.body.percentage,
                create_userid: userid,
                usermachinename: userMachineName,
                usermachineip: userMachineIP
              };

              promises.push(await ApprovalLines.create({approvalDetails},{ transaction }
                ).catch(err => {
                ordersApprovalResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating orderlines: ' + helper.parseError(err.message));
                resp.json(400, ordersApprovalResp);
                })
              );
            }

            Promise.all(promises);
            await transaction.commit();

            taxResp = respBody.ResponseBody('success', data,' created');
            resp.json(201, taxResp);

          } catch (error) {

           await transaction.rollback();
  
            ordersApprovalResp = respBody.ResponseBody('failed', '', 'Some error occurred while Approving order: ' + helper.parseError(error.message));
            resp.json(400, ordersApprovalResp);

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
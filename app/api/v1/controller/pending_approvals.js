const db = require('../models');
var dbConfig = require('../../../../config');
const Orders = db.orders;
const ApprovalLines = db.approvallines;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');
const orderSummary = require('./orderreceival_summary');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var pendingApprovalResp = {};

exports.findPendingOrders = async (req, res)=>{
    var resp = new Response.Response(res);

    try {

        summary = await ApprovalLines.findAndCountAll({
            where:{
                [Op.and]:[
                    {archived:'No'},
                    {stageid: 11}
                ],
                statusid:{
                    [Op.or]:[1,2]
                }
            }
        });
    
        if (summary.count > 0) {
    
            var pendingApprovedOrders = [];
            var approvedOrderDetails = [];
    
    
            for (var i = 0; i < recordset.rowsAffected; i++) {
    
                var id = recordset.recordset[i].approvalid;
                //orderSummary = recordset.recordset[i];
    
    
                var pendingReceivalSummary = await getOrdersReceivalSummary(id);
    
                var pendingReceivalDetails = await this.findPendingOrderApprovalDetails(id);
    
                var ordertransaction = {
                    summary: pendingReceivalSummary,
                    details: pendingReceivalDetails
                }
                pendingApprovedOrders.push(ordertransaction)
    
            }
    
            pendingApprovalResp = respBody.ResponseBody('success', pendingApprovedOrders, recordset.rowsAffected + ' record(s) found');
            resp.json(200, pendingApprovalResp);
            
        } else {
            pendingApprovalResp = respBody.ResponseBody('failed', '', 'Sorry No Pending orders(s) for receival');
            resp.json(404, pendingApprovalResp);
            
        }
        
    } catch (error) {

        pendingApprovalResp = respBody.ResponseBody('failed', '', 'failed with error: ' + helper.parseError(error));
        resp.json(404, pendingApprovalResp);
        
    }

};

exports.findPendingOrderApprovalDetails = async (orderID) => {

    try {
  
     // const {count,rows} = await Itembase.findAndCountAll({ where: { baseunit: description } });
      const rows = await Orderlines.findAndCountAll({ where: { orderid: orderID } });
      if (rows === null) {
  
        return null
  
      } else {
       // return {count,rows};
        return rows;
      }
    } catch (error) {
      return error;
    }
  };
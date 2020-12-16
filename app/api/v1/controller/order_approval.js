
const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');
const PendingSummary = require('./pending_order_approval_summary');
const PendingDetails = require('./pending_order_approval_details');

var pendingApprovalResp = {};

exports.findAllPendingOrders = async (req, res)=>{
    var resp = new Response.Response(res);

    try {

       const  orderSummary = await PendingSummary.ordersPendingAprovalSummary();
    
        if (orderSummary.count > 0) {
    
            var approvedOrderDetails = [];
    
            for (var i = 0; i < orderSummary.count; i++) {
    
                var pendingDetails = await PendingDetails.findPendingOrderApprovalDetails(orderSummary.rows[i].id);
    
                var ordertransaction = {
                    summary: orderSummary.rows[i],
                    details: pendingDetails
                }
                approvedOrderDetails.push(ordertransaction)
    
            }
    
            pendingApprovalResp = respBody.ResponseBody('success', '', orderSummary.count + ' record(s) found');
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

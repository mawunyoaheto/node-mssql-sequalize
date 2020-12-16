const db = require('../models');
var dbConfig = require('../../../../config');
const OrderLines = db.orderlines;
const Op = db.Sequelize.Op;

const { Console } = require('winston/lib/winston/transports');
const PendingSummary = require('./pending_order_approval_summary');


exports.findPendingOrderApprovalDetails = async (orderID,stageID, statusID) => {

    try {
      const rows = await OrderLines.findAndCountAll({where:{
        [Op.and]:[
            {archived:'No'},
            {stageid: stageID},
            {statusid:statusID}
        ]
    } });

      if (rows === null) {
  
        return null
  
      } else {

        return rows;
      }
    } catch (error) {
      return error;
    }
  };
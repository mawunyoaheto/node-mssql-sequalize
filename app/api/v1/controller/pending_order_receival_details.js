const db = require('../models');
var dbConfig = require('../../../../config');
const OrderApprovalLines = db.orderapprovallines;
const Op = db.Sequelize.Op;

const { Console } = require('winston/lib/winston/transports');


exports.findPendingOrderReceivalDetails = async (orderlineid) => {

    try {
      const rows = await OrderApprovalLines.findAndCountAll({where:{
        [Op.and]:[
            {orderlineid:orderlineid},
            {archived:'No'},
            {stageid: 11},
            {statusid:[1,2]}
        ]
    } });

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
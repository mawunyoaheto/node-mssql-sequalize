const db = require('../models');
var dbConfig = require('../../../../config');
const OrderLines = db.orderlines;
const Op = db.Sequelize.Op;

// const helper = require('../util/helper');
// const Response = require('../util/response');
// const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');
const PendingSummary = require('./approval_summary');


exports.findPendingOrderApprovalDetails = async (orderID) => {

    try {
  
     // const {count,rows} = await Itembase.findAndCountAll({ where: { baseunit: description } });
      const rows = await OrderLines.findAndCountAll({where:{
        [Op.and]:[
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
const db = require('../models');
var dbConfig = require('../../../../config');
const Orders = db.orders;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

 exports.ordersPendingAprovalSummary = async (orderid, stageID, statusID) =>{

    try {

        var rows = await Orders.findAndCountAll({
            where:{
                [Op.and]:[
                    {archived:'No'},
                    {stageid: stageID},
                    {statusid: statusID}
                ]
            }
        });

        if (rows.count > 0) {
    
            return rows;

        } else {
            return res.status(404).json({ 'message': 'failed' })
        }

    } catch (error) {
        return res.status(400).json('record not found with error: ' + helper.parseError(error, queryString))
    }

};
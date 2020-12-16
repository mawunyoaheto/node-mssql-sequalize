const db = require('../models');
var dbConfig = require('../../../../config');
const Approvals = db.orderapprovals;
const ApprovalLines = db.approvallines;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

 exports.ordersReceivalSummary = async (id) =>{

    try {

        const rows = await Approvals.findAndCountAll({where: {[Op.and]:
            [
                {id : id},
                {archived: 'No'}
            ]
        } 
    });

        if (rows.count > 0) {
            // send records as a response
            var summary = recordset.recordset[0];
            return summary

        } else {
            return res.status(404).json({ 'message': 'failed' })
        }

    } catch (error) {
        return res.status(400).json('record not found with error: ' + helper.parseError(error, queryString))
    }

}
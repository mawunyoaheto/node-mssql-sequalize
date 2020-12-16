const db = require('../models');
var dbConfig = require('../../../../config');
const Products = db.products;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;


exports.productdetails = async(productID)=>{


    await function getProductStockLevels(){

    }
}
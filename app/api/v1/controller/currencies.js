const db = require('../models');
const Currencies = db.currencies;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var currenciesResp = {};

// Create and Save a new Tax
exports.create = async (req, res) => {

  var resp = new Response.Response(res);
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Descrption can not be empty!"
    });
    return;
  }

  // Create a Tax
  const currency = {
    description: req.body.description,
    code: req.body.code,
    create_userid: userid,
    active: req.body.active ? req.body.active : false,
    //default: req.body.default ? req.body.default : false,
    usermachinename: userMachineName,
    usermachineip: userMachineIP
  };

  // Save Tax in the database
  await Currencies.create(currency)
    .then(data => {
      currenciesResp = respBody.ResponseBody('success', data,' created');
      resp.json(201, currenciesResp);
    })
    .catch(err => {
      currenciesResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Currency: ' + helper.parseError(err));
      resp.json(500, currenciesResp);
    });
};

exports.findAll = async (req, res) => {
  var resp = new Response.Response(res);
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    await Currencies.findAll({ where: condition })
      .then(data => {
        currenciesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, currenciesResp);
      })
      .catch(err => {
        currenciesResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Currencies: ' + helper.parseError(err));
        resp.json(500, currenciesResp);

      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Currencies.findByPk(id)
      .then(data => {
        currenciesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, currenciesResp);
      })
      .catch(err => {
        currenciesResp = respBody.ResponseBody('failed', '', 'Error retrieving Currencies with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, currenciesResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Currencies.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          currenciesResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, currenciesResp);
        } else {
        currenciesResp = respBody.ResponseBody('failed', '', `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`);
        resp.json(500, currenciesResp);
        }
      })
      .catch(err => {
        currenciesResp = respBody.ResponseBody('failed', '', `Error updating Currency with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, currenciesResp);
      });
  };


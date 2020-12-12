const db = require('../models');
var dbConfig = require('../../../../config');
const Taxes = db.taxes;
const Op = db.Sequelize.Op;


const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var taxResp = {};

// Create and Save a new Tax
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tax
    const tax = {
      description: req.body.description,
      percentage: req.body.percentage,
      userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save Tax in the database
    await Taxes.create(tax)
      .then(data => {
        taxResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, taxResp);
      })
      .catch(err => {
        taxResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Tax: ' + helper.parseError(err));
        resp.json(500, taxResp);
      });
  };

exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
  
    await Taxes.findAll({ where: condition })
      .then(data => {
        taxResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, taxResp);
      })
      .catch(err => {
        taxResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving taxes: ' + helper.parseError(err));
        resp.json(500, taxResp);
    
      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
   await Taxes.findByPk(id)
      .then(data => {
        taxResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, taxResp);
      })
      .catch(err => {
        taxResp = respBody.ResponseBody('failed', '', 'Error retrieving Tutorial with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, taxResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
   await Taxes.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
        //   res.send({
        //     message: "Currency was updated successfully."
        //   });       
          
          taxResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, taxResp);

        } else {
        //   res.send({
        //     message: `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`
        //   });
        taxResp = respBody.ResponseBody('failed', '', `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`);
        resp.json(500, taxResp);
        
        }
      })
      .catch(err => {
        // res.status(500).send({
        //   message: "Error updating Currency with id=" + id
        // });

        taxResp = respBody.ResponseBody('failed', '', `Error updating Tax with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, taxResp);
      });
  };
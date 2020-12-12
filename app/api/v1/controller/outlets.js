const db = require('../models');
var dbConfig = require('../../../../config');
const Outlets = db.outlets;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var outletsResp = {};

// Create and Save a new Outlet
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an Outlet
    const outlet = {
      outlet_name: req.body.outletname,
      country_id: req.body.countryID,
      region_id: req.body.regionID,
      city_id: req.body.cityID,
      email: req.body.email,
      contact_numbers: req.body.contactnumber,
      tax_id: req.body.taxID,
      create_userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save Outlet in the database
   await  Outlets.create(outlet)
      .then(data => {
        outletsResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, outletsResp);
      })
      .catch(err => {
        outletsResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Outlet: ' + helper.parseError(err));
        resp.json(500, outletsResp);
      });
  };

exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
  
   await Outlets.findAll({ where: condition })
      .then(data => {
        outletsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, outletsResp);
      })
      .catch(err => {
        outletsResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Outletes: ' + helper.parseError(err));
        resp.json(500, outletsResp);
    
      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Outlets.findByPk(id)
      .then(data => {
        outletsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, outletsResp);
      })
      .catch(err => {
        outletsResp = respBody.ResponseBody('failed', '', 'Error retrieving Outlets with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, outletsResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Outlets.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          outletsResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, outletsResp);

        } else {

        outletsResp = respBody.ResponseBody('failed', '', `Cannot update Outlet with id=${id}. Maybe Outlet was not found or req.body is empty!`);
        resp.json(500, outletsResp);
        
        }
      })
      .catch(err => {
        outletsResp = respBody.ResponseBody('failed', '', `Error updating Outlet with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, outletsResp);
      });
  };
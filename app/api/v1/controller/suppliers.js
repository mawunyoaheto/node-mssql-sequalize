const db = require('../models');
const Suppliers = db.suppliers;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var suppliersResp = {};

// Create and Save a new Supplier
exports.create = async (req, res) => {

  var resp = new Response.Response(res);
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Descrption can not be empty!"
    });
    return;
  }

  // Create a Supplier
  const supplier = {
    name: req.body.suppliername,
    address: req.body.address,
    phone_number: req.body.phonenumber,
    email: req.body.email,
    supplier_code: req.body.suppliercode,
    create_userid: userid,
    active: req.body.active ? req.body.active : false,
    usermachinename: userMachineName,
    usermachineip: userMachineIP
  };

  // Save Supplier in the database
  await Suppliers.create(supplier)
    .then(data => {
      suppliersResp = respBody.ResponseBody('success', data,' created');
      resp.json(201, suppliersResp);
    })
    .catch(err => {
      suppliersResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Supplier: ' + helper.parseError(err));
      resp.json(500, suppliersResp);
    });
};

exports.findAll = async (req, res) => {
  var resp = new Response.Response(res);
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    await Suppliers.findAll({ where: condition })
      .then(data => {
        suppliersResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, suppliersResp);
      })
      .catch(err => {
        suppliersResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Suppliers: ' + helper.parseError(err));
        resp.json(500, suppliersResp);

      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Suppliers.findByPk(id)
      .then(data => {
        suppliersResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, suppliersResp);
      })
      .catch(err => {
        suppliersResp = respBody.ResponseBody('failed', '', 'Error retrieving Supplier with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, suppliersResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await Suppliers.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          suppliersResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, suppliersResp);
        } else {
        suppliersResp = respBody.ResponseBody('failed', '', `Cannot update Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`);
        resp.json(500, suppliersResp);
        }
      })
      .catch(err => {
        suppliersResp = respBody.ResponseBody('failed', '', `Error updating Supplier with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, suppliersResp);
      });
  };


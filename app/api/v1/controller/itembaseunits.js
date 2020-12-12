const db = require('../models');
var dbConfig = require('../../../../config');
const Itembase = db.itembaseunits;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var itemBaseResp = {};

// Create and Save a new Item Base Unit
exports.create = async (req, res) => {

  var resp = new Response.Response(res);
  // Validate request
  if (!req.body.baseunit) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Item Base Unit
  const itembase = {
    baseunit: req.body.baseunit,
    create_userid: userid,
    active: req.body.active ? req.body.active : false,
    usermachinename: userMachineName,
    usermachineip: userMachineIP
  };

  // Save Item Base Unit in the database
  await Itembase.create(itembase)
    .then(data => {
      itemBaseResp = respBody.ResponseBody('success', data, ' created');
      resp.json(201, itemBaseResp);
    })
    .catch(err => {
      itemBaseResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Item Base Unit: ' + helper.parseError(err));
      resp.json(500, itemBaseResp);
    });
};

exports.findAll = async (req, res) => {
  var resp = new Response.Response(res);

  const description = req.query.description;
  var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

  await Itembase.findAll({ where: condition })
    .then(data => {
      itemBaseResp = respBody.ResponseBody('success', data, ' record(s) found');
      resp.json(200, itemBaseResp);
    })
    .catch(err => {
      itemBaseResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Item Base Units: ' + helper.parseError(err));
      resp.json(500, itemBaseResp);

    });
};

exports.findOne = async (req, res) => {
  var resp = new Response.Response(res);
  const id = req.params.id;

  await Itembase.findByPk(id)
    .then(data => {
      itemBaseResp = respBody.ResponseBody('success', data, ' record(s) found');
      resp.json(200, itemBaseResp);
    })
    .catch(err => {
      itemBaseResp = respBody.ResponseBody('failed', '', 'Error retrieving Item base Unit with id= ' + id + ',error details: ' + helper.parseError(err));
      resp.json(500, itemBaseResp);
    });
};

exports.update = async (req, res) => {
  var resp = new Response.Response(res);
  const id = req.params.id;

  await Itembase.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        itemBaseResp = respBody.ResponseBody('success', '', 'updated successfully');
        resp.json(200, itemBaseResp);

      } else {

        itemBaseResp = respBody.ResponseBody('failed', '', `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`);
        resp.json(500, itemBaseResp);

      }
    })
    .catch(err => {
      itemBaseResp = respBody.ResponseBody('failed', '', `Error updating Item Base Unit with id =${id},error details: ` + helper.parseError(err));
      resp.json(500, itemBaseResp);
    });
};

exports.findOneByID = async (id) => {

  await Itembase.findByPk(id)
    .then(data => {
      return data;
    })
    .catch(err => {

      return err.message;
    });
};


exports.findOneByDescription = async (description) => {

  try {

   // const {count,rows} = await Itembase.findAndCountAll({ where: { baseunit: description } });
    const rows = await Itembase.findAndCountAll({ where: { baseunit: description } });
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
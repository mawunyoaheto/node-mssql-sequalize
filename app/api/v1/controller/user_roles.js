const db = require('../models');
var dbConfig = require('../../../../config');
const User_roles = db.user_roles;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var rolesResp = {};

// Create and Save a new User Role
exports.create = (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an User Role
    const user_role = {
      name: req.body.name,
      note: req.body.note,
      create_userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save User Role in the database
    User_roles.create(user_role)
      .then(data => {
        rolesResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, rolesResp);
      })
      .catch(err => {
        rolesResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating User Role: ' + helper.parseError(err));
        resp.json(500, rolesResp);
      });
  };

exports.findAll = (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
  
    User_roles.findAll({ where: condition })
      .then(data => {
        rolesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, rolesResp);
      })
      .catch(err => {
        rolesResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving User Roles: ' + helper.parseError(err));
        resp.json(500, rolesResp);
    
      });
  };

  exports.findOne = (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    User_roles.findByPk(id)
      .then(data => {
        rolesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, rolesResp);
      })
      .catch(err => {
        rolesResp = respBody.ResponseBody('failed', '', 'Error retrieving User_roles with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, rolesResp);
      });
  };

  exports.update = (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    User_roles.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          rolesResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, rolesResp);

        } else {

        rolesResp = respBody.ResponseBody('failed', '', `Cannot update User Role with id=${id}. Maybe User Role was not found or req.body is empty!`);
        resp.json(500, rolesResp);
        
        }
      })
      .catch(err => {
        rolesResp = respBody.ResponseBody('failed', '', `Error updating User Role with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, rolesResp);
      });
  };
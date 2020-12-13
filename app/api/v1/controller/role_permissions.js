const db = require('../models');
const RolePermissions = db.role_permissions;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var rolePermissionsResp = {};

// Create and Save a new Role Permissions
exports.create = async (req, res) => {

  var resp = new Response.Response(res);

  // Create a Role Permissions
  const rolepermissions = {
    userid: req.body.userid,
    moduleid: req.body.moduleid,
    moduletransid: req.body.moduletransid,
    transstageid: req.body.transstageid,
    canadd: req.body.add,
    canedit: req.body.edit,
    canview: req.body.view,
    canprint: req.body.print,
    candelete: req.body.delete,
    viewchangelog: req.body.viewlog,
    create_userid: userid,
    active: req.body.active ? req.body.active : false,
    usermachinename: userMachineName,
    usermachineip: userMachineIP
  };

  // Save Role Permissions in the database
  await RolePermissions.create(rolePermissions)
    .then(data => {
      rolePermissionsResp = respBody.ResponseBody('success', data,' created');
      resp.json(201, rolePermissionsResp);
    })
    .catch(err => {
      rolePermissionsResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Role Permissions: ' + helper.parseError(err));
      resp.json(500, rolePermissionsResp);
    });
};

exports.findAll = async (req, res) => {
  var resp = new Response.Response(res);
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    await UserPermissions.findAll({ where: condition })
      .then(data => {
        rolePermissionsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, rolePermissionsResp);
      })
      .catch(err => {
        rolePermissionsResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving UserPermissions: ' + helper.parseError(err));
        resp.json(500, rolePermissionsResp);

      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await UserPermissions.findByPk(id)
      .then(data => {
        rolePermissionsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, rolePermissionsResp);
      })
      .catch(err => {
        rolePermissionsResp = respBody.ResponseBody('failed', '', 'Error retrieving Role Permissions with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, rolePermissionsResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await UserPermissions.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          rolePermissionsResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, rolePermissionsResp);
        } else {
        rolePermissionsResp = respBody.ResponseBody('failed', '', `Cannot update Role Permissions with id=${id}. Maybe Role Permissions was not found or req.body is empty!`);
        resp.json(500, rolePermissionsResp);
        }
      })
      .catch(err => {
        rolePermissionsResp = respBody.ResponseBody('failed', '', `Error updating Role Permissions with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, rolePermissionsResp);
      });
  };


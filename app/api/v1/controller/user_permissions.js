const db = require('../models');
const UserPermissions = db.user_permissions;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var userPermissionsResp = {};

// Create and Save a new User Permissions
exports.create = async (req, res) => {

  var resp = new Response.Response(res);

  // Create a User Permissions
  const userpermissions = {
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

  // Save User Permissions in the database
  await UserPermissions.create(userpermissions)
    .then(data => {
      userPermissionsResp = respBody.ResponseBody('success', data,' created');
      resp.json(201, userPermissionsResp);
    })
    .catch(err => {
      userPermissionsResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating User Permissions: ' + helper.parseError(err));
      resp.json(500, userPermissionsResp);
    });
};

exports.findAll = async (req, res) => {
  var resp = new Response.Response(res);
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    await UserPermissions.findAll({ where: condition })
      .then(data => {
        userPermissionsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, userPermissionsResp);
      })
      .catch(err => {
        userPermissionsResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving UserPermissions: ' + helper.parseError(err));
        resp.json(500, userPermissionsResp);

      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
    await UserPermissions.findByPk(id)
      .then(data => {
        userPermissionsResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, userPermissionsResp);
      })
      .catch(err => {
        userPermissionsResp = respBody.ResponseBody('failed', '', 'Error retrieving User Permissions with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, userPermissionsResp);
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

          userPermissionsResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, userPermissionsResp);
        } else {
        userPermissionsResp = respBody.ResponseBody('failed', '', `Cannot update User Permissions with id=${id}. Maybe User Permissions was not found or req.body is empty!`);
        resp.json(500, userPermissionsResp);
        }
      })
      .catch(err => {
        userPermissionsResp = respBody.ResponseBody('failed', '', `Error updating User Permissions with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, userPermissionsResp);
      });
  };


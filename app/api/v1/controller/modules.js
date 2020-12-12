const db = require('../models');
const Modules = db.modules;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;

var modulesResp = {};


// Create and Save a new Module
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Descrption can not be empty!"
      });
      return;
    }
  
    // Create a Module
    const modules = {
      description: req.body.description,
      code: req.body.address,
      directory: req.body.code,
      baseassemblyname: req.body.baseassemblyname,
      versionnumber: req.body.versionnumber,
      versionname: req.body.versionname,
      appl_type_id: req.body.apptypeid,
      url: req.body.url,
      iconid: req.body.iconid,
      moduletypeid: req.body.moduletypeid,
      create_userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save Module in the database
    await Modules.create(modules)
      .then(data => {
        modulesResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, modulesResp);
      })
      .catch(err => {
        modulesResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Module: ' + helper.parseError(err));
        resp.json(500, modulesResp);
      });
  };
  
  exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);
      const title = req.query.title;
      var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
      await Modules.findAll({ where: condition })
        .then(data => {
          modulesResp = respBody.ResponseBody('success', data,' record(s) found');
          resp.json(200, modulesResp);
        })
        .catch(err => {
          modulesResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Modules: ' + helper.parseError(err));
          resp.json(500, modulesResp);
  
        });
    };
  
    exports.findOne = async (req, res) => {
      var resp = new Response.Response(res);
      const id = req.params.id;
    
      await Modules.findByPk(id)
        .then(data => {
          modulesResp = respBody.ResponseBody('success', data,' record(s) found');
          resp.json(200, modulesResp);
        })
        .catch(err => {
          modulesResp = respBody.ResponseBody('failed', '', 'Error retrieving Module with id= ' + id + ',error details: ' + helper.parseError(err));
          resp.json(500, modulesResp);
        });
    };
  
    exports.update = async (req, res) => {
      var resp = new Response.Response(res);
      const id = req.params.id;
    
      await Modules.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
  
            modulesResp = respBody.ResponseBody('success', '','updated successfully');
            resp.json(200, modulesResp);
          } else {
          modulesResp = respBody.ResponseBody('failed', '', `Cannot update Module with id=${id}. Maybe Module was not found or req.body is empty!`);
          resp.json(500, modulesResp);
          }
        })
        .catch(err => {
          modulesResp = respBody.ResponseBody('failed', '', `Error updating Module with id =${id},error details: ` + helper.parseError(err));
          resp.json(500, modulesResp);
        });
    };
  
  
const db = require('../models');
const TranStages = db.transactionstages;
const Op = db.Sequelize.Op;
var dbConfig = require('../../../../config');

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;

var transStageResp = {};


// Create and Save a new Transaction Stage
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Descrption can not be empty!"
      });
      return;
    }
  
    // Create a Transaction Stage
    const transtages = {
      description: req.body.description,
      code: req.body.code,
      url: req.body.url,
      iconid: req.body.iconid,
      module_trans_id: req.body.moduletransid,
      create_userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save Transaction Stage in the database
    await TranStages.create(transtages)
      .then(data => {
        transStageResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, transStageResp);
      })
      .catch(err => {
        transStageResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Transaction Stage: ' + helper.parseError(err));
        resp.json(500, transStageResp);
      });
  };
  
  exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);
      const title = req.query.title;
      var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
      await TranStages.findAll({ where: condition })
        .then(data => {
          transStageResp = respBody.ResponseBody('success', data,' record(s) found');
          resp.json(200, transStageResp);
        })
        .catch(err => {
          transStageResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Transaction Stages: ' + helper.parseError(err));
          resp.json(500, transStageResp);
  
        });
    };
  
    exports.findOne = async (req, res) => {
      var resp = new Response.Response(res);
      const id = req.params.id;
    
      await TranStages.findByPk(id)
        .then(data => {
          transStageResp = respBody.ResponseBody('success', data,' record(s) found');
          resp.json(200, transStageResp);
        })
        .catch(err => {
          transStageResp = respBody.ResponseBody('failed', '', 'Error retrieving Transaction Stage with id= ' + id + ',error details: ' + helper.parseError(err));
          resp.json(500, transStageResp);
        });
    };
  
    exports.update = async (req, res) => {
      var resp = new Response.Response(res);
      const id = req.params.id;
    
      await TranStages.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
  
            transStageResp = respBody.ResponseBody('success', '','updated successfully');
            resp.json(200, transStageResp);
          } else {
          transStageResp = respBody.ResponseBody('failed', '', `Cannot update Transaction Stage with id=${id}. Maybe Transaction Stage was not found or req.body is empty!`);
          resp.json(500, transStageResp);
          }
        })
        .catch(err => {
          transStageResp = respBody.ResponseBody('failed', '', `Error updating Transaction Stage with id =${id},error details: ` + helper.parseError(err));
          resp.json(500, transStageResp);
        });
    };
  
  
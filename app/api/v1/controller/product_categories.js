const db = require('../models');
var dbConfig = require('../../../../config');
const Productcat = db.productcategories;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var categoriesResp = {};

// Create and Save a new Product Category
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.category) {
      res.status(400).send({
        message: "Category can not be empty!"
      });
      return;
    }
  
    // Create a Product Category
    const productcat = {
      category: req.body.category,
      create_userid: userid,
      active: req.body.active ? req.body.active : false,
      usermachinename: userMachineName,
      usermachineip: userMachineIP
    };
  
    // Save Product Category in the database
    await Productcat.create(productcat)
      .then(data => {
        categoriesResp = respBody.ResponseBody('success', data,' created');
        resp.json(201, categoriesResp);
      })
      .catch(err => {
        categoriesResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Product Category: ' + helper.parseError(err));
        resp.json(500, categoriesResp);
      });
  };

exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
  
    await Productcat.findAll({ where: condition })
      .then(data => {
        categoriesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, categoriesResp);
      })
      .catch(err => {
        categoriesResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Product Categories: ' + helper.parseError(err));
        resp.json(500, categoriesResp);
    
      });
  };

  exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
   await Productcat.findByPk(id)
      .then(data => {
        categoriesResp = respBody.ResponseBody('success', data,' record(s) found');
        resp.json(200, categoriesResp);
      })
      .catch(err => {
        categoriesResp = respBody.ResponseBody('failed', '', 'Error retrieving Tutorial with id= ' + id + ',error details: ' + helper.parseError(err));
        resp.json(500, categoriesResp);
      });
  };

  exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;
  
   await Productcat.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {

          categoriesResp = respBody.ResponseBody('success', '','updated successfully');
          resp.json(200, categoriesResp);

        } else {

        categoriesResp = respBody.ResponseBody('failed', '', `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`);
        resp.json(500, categoriesResp);
        
        }
      })
      .catch(err => {

        categoriesResp = respBody.ResponseBody('failed', '', `Error updating Product Category with id =${id},error details: ` + helper.parseError(err));
        resp.json(500, categoriesResp);
      });
  };

  exports.findOneByID = async (id) => {

    await Productcat.findByPk(id)
       .then(data => {
         return data;
       })
       .catch(err => {
 
         return err.message;
       });
   };


   exports.findOneByDescription = async (description) => {

    try {

      const rows = await Productcat.findAndCountAll({ where: { category: description } });
      if (rows === null) {
        
        return null

      } else {
        return rows;
      }
    } catch (error) {
      return error;
    }
   };
const db = require('../models');
var dbConfig = require('../../../../config');
const Products = db.products;
const Op = db.Sequelize.Op;

const helper = require('../util/helper');
const Response = require('../util/response');
const respBody = require('../util/response');
const { Console } = require('winston/lib/winston/transports');

const userid = `${dbConfig.app_user}`;
const userMachineName = `${dbConfig.userMachine}`;
const userMachineIP = `${dbConfig.userIP}`;



var productsResp = {};

// Create and Save a new Product
exports.create = async (req, res) => {

    var resp = new Response.Response(res);
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Product
    const products = {
        description: req.body.description,
        extended_description: req.body.ext_description,
        product_code: req.body.product_code,
        cost_price: req.body.cost_price,
        s_price: req.body.s_price,
        categoryid: req.body.category_id,
        baseunit_id: req.body.baseunit_id,
        create_userid: userid,
        usermachinename: userMachineName,
        usermachineip: userMachineIP
    };

    // Save Product in the database
    await Products.create(products)
        .then(data => {
            productsResp = respBody.ResponseBody('success', data, ' created');
            resp.json(201, productsResp);
        })
        .catch(err => {
            productsResp = respBody.ResponseBody('failed', '', 'Some error occurred while creating Product: ' + helper.parseError(err));
            resp.json(500, productsResp);
        });
};

exports.findAll = async (req, res) => {
    var resp = new Response.Response(res);

    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    await Products.findAll({ where: condition })
        .then(data => {
            productsResp = respBody.ResponseBody('success', data, ' record(s) found');
            resp.json(200, productsResp);
        })
        .catch(err => {
            productsResp = respBody.ResponseBody('failed', '', 'Some error occurred while retrieving Products: ' + helper.parseError(err));
            resp.json(500, productsResp);

        });
};

exports.findOne = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;

    await Products.findByPk(id)
        .then(data => {
            productsResp = respBody.ResponseBody('success', data, ' record(s) found');
            resp.json(200, productsResp);
        })
        .catch(err => {
            productsResp = respBody.ResponseBody('failed', '', 'Error retrieving Product with id= ' + id + ',error details: ' + helper.parseError(err));
            resp.json(500, productsResp);
        });
};

exports.update = async (req, res) => {
    var resp = new Response.Response(res);
    const id = req.params.id;

    await Products.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                productsResp = respBody.ResponseBody('success', '', 'updated successfully');
                resp.json(200, productsResp);

            } else {

                productsResp = respBody.ResponseBody('failed', '', `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`);
                resp.json(500, productsResp);

            }
        })
        .catch(err => {

            productsResp = respBody.ResponseBody('failed', '', `Error updating Product with id =${id},error details: ` + helper.parseError(err));
            resp.json(500, productsResp);
        });
};

exports.findOneByID = async (id) => {

    await Products.findByPk(id)
        .then(data => {
            return data;
        })
        .catch(err => {

            return err.message;
        });
};
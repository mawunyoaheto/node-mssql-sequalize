var express = require('express');
const app = express();
const config = require('./config');
var bodyParser = require('body-parser');
var sql = require('mssql');

var db=require('./api/v1/util/db');





const server = app.listen(config.port, function (req, res) {
    app.set('json spaces', 40);
    console.log(`Server running at http://${ config.host }:${ config.port }...`);
  });
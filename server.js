var express = require('express');
const app = express();
const config = require('./config');
var bodyParser = require('body-parser');
var sequelize =require('./api/v1/util/db'); 
const models = require('./api/v1/models'); 

app.use(bodyParser.json());

 models.sequelize.sync({ force: false })
.then(() => {
  console.log(`Database & tables created!`);
});

const server = app.listen(config.port, function (req, res) {
    app.set('json spaces', 40);
    console.log(`Server running at http://${ config.host }:${ config.port }...`);
  });


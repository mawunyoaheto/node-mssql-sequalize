//const Sequelize = require('sequelize');
const config = require('../../../config');
const fs = require("fs");
const { Sequelize, DataTypes } = require("sequelize");

const sequelConnect = new Sequelize(config.db.database, config.db.user, config.db.password,config.sql);

sequelConnect
  .authenticate()
  .then(() => {
    console.log('Connection to Database established successfully.');
    //return pool;
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports={
     sequelConnect,
     Sequelize
  }


// let DB = {};

// module.exports = {
//     //init: async (System) => {
//         const sequelize =  new Sequelize(config.db.database, config.db.user, config.db.password, config.sql);

//         // fs.readdirSync("./modules").forEach((file) => {
//         //     let modelsName = require(`../../modules/${file}/models/${file}`);
//         //     modelsName(sequelize, DataTypes)
//         //         .sync({ force: true })
//         //         .then((model) => {
//         //             DB[file] = model;
//         //             console.log("the model is ", model);
//         //         });
//         // });

//         await sequelize
//             .authenticate()
//             .then(() => {
//                 console.log('Connection to Database established successfully.');
//                 //return pool;
//             })
//             .catch(err => {
//                 console.error('Unable to connect to the database:', err);
//             });
//     },
//     DB,
// };
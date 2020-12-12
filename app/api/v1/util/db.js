//const Sequelize = require('sequelize');
const config = require('../../../../config');
const fs = require("fs");
const { Sequelize, DataTypes } = require("sequelize");

var sequelConnect;

switch ((config.appDatabase).toLocaleUpperCase()) {
  case "MYSQL":
    sequelConnect = new Sequelize(config.mysql_db.database, config.mysql_db.user, config.mysql_db.password,config.mysqlOptions);

    sequelConnect
      .authenticate()
      .then(() => {
        console.log('Connection to MYSQL Database established successfully.');
        //return pool;
      })
      .catch(err => {
        console.error('Unable to connect to MYSQL database:', err);
      });
    
    break;

  case "MSSQL":
    sequelConnect = new Sequelize(config.mssql_db.database, config.mssql_db.user, config.mssql_db.password, config.mssqlOptions);

    sequelConnect
      .authenticate()
      .then(() => {
        console.log('Connection to MSSQL Database established successfully.');
        //return pool;
      })
      .catch(err => {
        console.error('Unable to connect to MSSQL database:', err);
      });

    break;
  default:
    console.log('Wrong Database configuration ');
    break;
}


module.exports = {
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
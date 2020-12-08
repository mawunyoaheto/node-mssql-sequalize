const users = require('./users');
const { sequelConnect, Sequelize, DataTypes } = require('../util/db');
const path = require('path');
const fs = require('fs');
const config = require('../../../config');

const sequelize = sequelConnect;

const filebasename = path.basename(__filename);
const db = {};

// const models ={
//     users:require(path.join(__dirname, "users"))(sequelize, Sequelize.DataTypes),
//     users:require(path.join(__dirname, "outlets"))(sequelize, Sequelize.DataTypes)
// } 

// Object.keys(models).forEach(modelName => {
//   if ("associate" in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

fs
    .readdirSync(__dirname)
    .filter((file) => {
        const returnFile = (file.indexOf('.') !== 0)
            && (file !== filebasename)
            && (file.slice(-3) === '.js');
        return returnFile;
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const sequelizeOptions = { logging: console.log, };

// Removes all tables and recreates them (only available if env is not in production)
if (config.dbForceRestart === 'true' && process.env.ENV !== 'production') {
    sequelizeOptions.force = true;
}

sequelize.sync(sequelizeOptions)
    .catch((err) => {
        console.log(err);
        process.exit();
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
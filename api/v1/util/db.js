const Sequelize = require('sequelize');
const config = require('../../../config');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,config.sql);

const sequelizeConnect = sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Database established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports={
sequelizeConnect
  }
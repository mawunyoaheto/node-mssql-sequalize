const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Regions = sequelize.define('regions', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        code: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        create_userid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        modifier_userid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        usermachinename: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        usermachineip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    });
 
    return Regions;
 }
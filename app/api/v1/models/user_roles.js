const {sequlelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const User_Roles = sequelize.define('user_roles', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        note: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        create_userid: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        modifier_userid: {
            type: DataTypes.INTEGER,
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
 
    return User_Roles;
 }
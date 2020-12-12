const {sequlelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const User_Role_Permissions = sequelize.define('user_role_permissions', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        roleid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        moduleid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        moduletransid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        transstageid: {
            type: DataTypes.BIGINT,
            notEmpty: true
        },
        canadd: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        canedit: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        canview: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        canprint: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        candelete: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        viewchangelog: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
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
 
    return User_Role_Permissions;
 }
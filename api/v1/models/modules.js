const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Modules = sequelize.define('modules', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        directory: {
            type: DataTypes.STRING,
            allowNull: true
        },
        baseassemblyname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        versionnumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        versionname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sync_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        appl_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iconid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        moduletypeid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        create_userid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        modifier_userid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        usermachinename: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usermachineip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        servertime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    
    });
 
    return Modules;
 }
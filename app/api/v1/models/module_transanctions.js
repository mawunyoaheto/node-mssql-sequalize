const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const ModuleTransactions = sequelize.define('moduletransactions', {
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
        order: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        optional: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        moduleid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        appl_type_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        branchid: {
            type: DataTypes.BIGINT,
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
 
    return ModuleTransactions;
 }
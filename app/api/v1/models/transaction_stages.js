const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const TransactionStages = sequelize.define('transactionstages', {
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
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iconid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        module_trans_id: {
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
 
    return TransactionStages;
 }
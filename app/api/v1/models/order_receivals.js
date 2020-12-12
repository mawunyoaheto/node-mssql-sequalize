const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const OrderReceivals = sequelize.define('orderreceivals', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        orderid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        receivedate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        waybillno: {
            type: DataTypes.STRING,
            allowNull: true
        },
        srano: {
            type: DataTypes.STRING,
            allowNull: true
        },
        receivalno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remarks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        linestotal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        totalvalue: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: true,
            defaultValue: 0.0000
        },
        outletid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        create_userid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        modifier_userid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        usermachinename: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usermachineip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    });
 
    return OrderReceivals;
 }
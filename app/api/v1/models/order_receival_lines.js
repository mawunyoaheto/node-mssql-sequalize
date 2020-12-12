const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const OrderReceivalLines = sequelize.define('orderreceivallines', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        orderlineid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        receivalid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        productid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        itemunitid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        qtyreceived: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitcost: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        batchno: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expirydate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        linetotalcost: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        returnstatusid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        returneeid: {
            type: DataTypes.BIGINT,
            allowNull: true
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
            allowNull: true
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
 
    return OrderReceivalLines;
 }
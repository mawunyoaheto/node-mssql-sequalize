const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Orderlines = sequelize.define('orderlines', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        orderid: {
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitcost: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        linetotalcost: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        stocklevel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reorderlevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        approvedqty: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        receivedqty: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        approvallevelid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        approvalstatusid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stageid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        statusid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        supplierid: {
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
            allowNull: true
        },
        usermachinename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usermachineip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    });
 
    return Orderlines;
 }
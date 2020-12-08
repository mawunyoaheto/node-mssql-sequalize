const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const ApprovalLines = sequelize.define('approvallines', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        orderlineid: {
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
        unitcost: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        approvedqty: {
            type: DataTypes.INTEGER,
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
        remarks: {
            type: DataTypes.STRING,
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
 
    return ApprovalLines;
 }
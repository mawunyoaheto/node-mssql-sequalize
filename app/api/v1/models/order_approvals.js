const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const OrderApprovals = sequelize.define('orderapprovals', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        orderid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        approverid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        approvalnumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        approvallevelid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        remark: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        linestotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalvalue: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false,
            defaultValue: 0.0000
        },
        stageid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        statusid: {
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
 
    return OrderApprovals;
 }
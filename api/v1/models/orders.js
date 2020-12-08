const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('orders', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        invoiceno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        awardno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        linestotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalvalue: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false
        },
        supplierid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(20, 4),
            allowNull: false,
            defaultValue: 0.0000
        },
        vatid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        orderterms: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ordercomments: {
            type: DataTypes.STRING,
            allowNull: true
        },
        outletid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        stageid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        statusid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        receiverid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        orderdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
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
 
    return Orders;
 }
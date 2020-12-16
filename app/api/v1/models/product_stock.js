const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const ProductStock = sequelize.define('productstock', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        productid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        stocklevel: {
            type: DataTypes.BIGINT,
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
        unitcost: {
            type: DataTypes.DECIMAL(20,4),
            allowNull: true
          },
        outletid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        baseunit_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        actualstocklevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        reorderlevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        eoq: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        averageconsumption: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        leadtime: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        minstocklevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maxstocklevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        transactionid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stageid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        statusid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        issuerid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        receiverid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        modifier_userid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        archived: {
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
 
    return ProductStock;
 }
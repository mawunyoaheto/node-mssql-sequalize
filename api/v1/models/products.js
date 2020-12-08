const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const TransactionStatuses = sequelize.define('transactionstatuses', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        extended_description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currencyid: {
            type: DataTypes.BIGINT
          },
        cost_price: {
            type: DataTypes.DECIMAL(20,4),
            allowNull: false
        },
        s_price: {
            type: DataTypes.DECIMAL(20,4),
            allowNull: false
        },
        categoryid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        baseunit_id: {
            type: DataTypes.BIGINT,
            allowNull: false
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
 
    return TransactionStatuses;
 }
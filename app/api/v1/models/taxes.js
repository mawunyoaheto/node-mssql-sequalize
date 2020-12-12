const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Taxes = sequelize.define('taxes', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        percentage: {
            type: DataTypes.DECIMAL(20,2),
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
 
    return Taxes;
 }
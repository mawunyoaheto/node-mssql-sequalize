const {sequlelize,Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const ItemBaseUnits = sequelize.define('itembaseunits', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        baseunit: {
            type: DataTypes.STRING,
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
 
    return ItemBaseUnits;
 }
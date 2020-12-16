const { sequlelize, Sequelize } = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const InventoryControlConfig = sequelize.define('inventorycontrolconfig', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        productid: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        storeid: {
            type: DataTypes.BIGINT,
            allowNull: false
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
            allowNull: false,
            defaultValue: 0
        },
        eoq: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        averageconsumption: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        leadtime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        minstocklevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        maxstocklevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        create_userid: {
            type: DataTypes.BIGINT,
            allowNull: false
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

    },{
        getterMethods:{
            reorderlevel: function(){ return this.getDataValue('reorderlevel')},
            eoq: function(){ return this.getDataValue('eoq')},
            leadtime: function(){ return this.getDataValue('leadtime')},
            minstocklevel: function(){ return this.getDataValue('minstocklevel')},
            maxstocklevel: function(){ return this.getDataValue('maxstocklevel')},
            averageconsumption: function(){ return this.getDataValue('averageconsumption')},

        }
    }
    );

    return InventoryControlConfig;
}

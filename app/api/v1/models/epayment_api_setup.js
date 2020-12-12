const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const EpaymentAPISetup = sequelize.define('epaymentapisetup', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requesturl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        statusurl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        payloadtypeid: {
            type: DataTypes.STRING
          },
        apikey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secretkey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        requestbody: {
            type: DataTypes.STRING,
            allowNull: true
        },
        statusbody: {
            type: DataTypes.STRING,
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
 
    return EpaymentAPISetup;
 }
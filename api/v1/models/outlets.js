const {sequlelize, Sequelize} = require('../util/db');

module.exports = (sequelize, DataTypes) => {
    const Outlets = sequelize.define('outlets', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        outlet_name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        country_id: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        region_id: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        city_id: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            notEmpty: true,
            validate: {
                isEmail: true
            }
        },
        contact_numbers: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        tax_id: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        create_userid: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        modifier_userid: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: true
        },
        usermachinename: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        usermachineip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    });
 
    return Outlets;
 }
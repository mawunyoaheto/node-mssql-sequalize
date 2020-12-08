"use strict";

const assert = require("assert");
const dotenv = require('dotenv');


// read in the .env file
dotenv.config();


// capture the environment variables the application needs

const {
    PORT,
    SQL_PORT,
    HOST,
    HOST_URL,
    COOKIE_ENCRYPT_PWD,
    SQL_HOST,
    APP_USERID,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    USER_MACHINE_IP,
    USER_MACHINE_NAME,
    PRIVATE_VAPID_KEY,
    PUBLIC_VAPID_KEY,
    SQL_DIALECT,
    INSTANCE_NAME,
    DB_FORCE_RESTART
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(SQL_HOST, "SQL_HOST configuration is required");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");

console.log('server-name',SQL_HOST)
console.log('server-PORT',SQL_PORT)


module.exports = {
    userMachine: USER_MACHINE_NAME,
    userIP: USER_MACHINE_IP,
    app_user: APP_USERID,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    cookiePwd: COOKIE_ENCRYPT_PWD,
    privVapidKey: PRIVATE_VAPID_KEY,
    pubVapidKey: PUBLIC_VAPID_KEY,
    dbForceRestart: DB_FORCE_RESTART,
    db:{
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD
    },
    sql: {
        host: SQL_HOST,
        dialect:SQL_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
        dialectOptions:{
        options: {
            instanceName: INSTANCE_NAME,
            encrypt:false,
            enableArithAbort:false,
            validateBulkLoadParameters: false
            }
        }
    }
};

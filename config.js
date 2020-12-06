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
    SQL_DIALECT
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
    db:{
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD
    },
    sql: {
        host: SQL_HOST,
        dialect:SQL_DIALECT,
        dialectOptions:{
        options: {
            encrypt:false,
            enableArithAbort:false
            }
        }
        // pool: {
        //         min: 0,
        //         max: 10,
        //         idleTimeoutMillis: 3000
        //      }   
        // "dialectOptions": {
        //     encrypt:true,
        //     options: { "requestTimeout": 900000 }
        //   }
     
        
        // option: {
        //     acquireTimeoutMillis: 3000,
        //     // idleTimeoutMillis: 300000,
        //     // encrypt: sqlEncrypt,
        //     connectionTimeout: 800000,
        //     requestTimeout: 1000000
        // }
    }
};

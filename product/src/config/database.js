import fs from 'fs';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env')});

module.exports = {
  development: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    dialectOptions: {
      // options
      connectTimeout: 1000,
    },
    // Use a different storage type. Default: sequelize
    migrationStorage: "json",
    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: "database/migrations-sequelize-meta.json",
  },
  test: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    dialectOptions: {
      // options
      connectTimeout: 1000,
    }
  },
  production: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    dialectOptions: {
      // options
      connectTimeout: 1000,
      /* ssl: {
        ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      } */
    }
  }
};
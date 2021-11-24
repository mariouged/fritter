const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env')});

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
    migrationStoragePath: "src/database/migrations-sequelize-meta.json",
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    dialect: process.env.TEST_DB_DIALECT,
    //storage: process.env.TEST_DB_STORAGE
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
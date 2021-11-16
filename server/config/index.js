const configs = require('./database');
const { Sequelize } = require('sequelize')

const config = configs[process.env?.NODE_ENV]

const connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        dialectOptions:config.dialectOptions,
        host: config.host,
        port: config.port,
    }
);

module.exports = connection;

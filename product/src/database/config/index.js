import configs from './database';
import Sequelize from 'sequelize';

const config = configs[process.env?.NODE_ENV];

const connectionDB = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        dialectOptions: config.dialectOptions,
        host: config.host,
        port: config.port,
        //storage: config.storage
    }
);

module.exports = connectionDB;


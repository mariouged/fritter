const { Sequelize } = require('sequelize');

const {
		DB_MYSQL_DIALECT,
    DB_MYSQL_HOST,
    DB_MYSQL_PORT,
    DB_MYSQL_DATABASE,
    DB_MYSQL_USERNAME,
    DB_MYSQL_PASSWORD,
} = process.env;

console.log(process.env.DB_MYSQL_DATABASE);
module.exports.createConnection = async () => {

	const sequelize = new Sequelize(DB_MYSQL_DATABASE, DB_MYSQL_USERNAME, DB_MYSQL_PASSWORD, {
		dialect: DB_MYSQL_DIALECT,
		dialectOptions: {
			// mariadb options here
			connectTimeout: 1000,
		},
		host: DB_MYSQL_HOST,
		port: DB_MYSQL_PORT,
	});

	try {
		await sequelize.authenticate();
		console.log('[MariaDB] Connection has been established successfully.');
	} catch (error) {
		console.error('[MariaDB] Unable to connect to the database:', error);
	}
}

import Sequelize from 'sequelize';
import connection from '../config';

module.exports.initializeDatabase = async () => {
	try {
		await connection.authenticate();
		console.log('[MariaDB] Connection has been established successfully.');
	} catch (error) {
		console.error('[MariaDB] Unable to connect to the database:', error);
	}
}

import connection from '../config';
import { Product } from '../models/database';

module.exports.initializeDatabase = async (mode = null) => {
	try {
		await connection.authenticate();
		console.log('[DB] Connection has been established successfully.');
		if (mode === 'test') {
			await Product.sync({});
		}
	} catch (error) {
		console.error('[DB] Unable to connect to the database:', error);
	}
}

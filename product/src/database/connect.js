import connectionDB from './config';
import { Product } from './models';

module.exports.initializeDatabase = async (mode = null) => {
	try {
		await connectionDB.authenticate();
		console.log('[DB] Connection has been established successfully.');
		if (mode === 'test') {
			await Product.sync({});
		}
	} catch (error) {
		console.error('[DB] Unable to connect to the database:', error);
	}
}

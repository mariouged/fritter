
import amqp from 'amqplib';

export default class MQ {
	static instance = null; // { connection: null, channel: null};

	static async initialize() {
		if (MQ.instance) {
			return MQ.instance;
		}
		return MQ.instance = await amqp.connect(
			{
				protocol: 'amqp',
				hostname: process.env.RABBITMQ_HOST,
				port: process.env.RABBITMQ_QUEUE_PORT,
				username: process.env.RABBITMQ_DEFAULT_USER,
				password: process.env.RABBITMQ_DEFAULT_PASS,
				frameMax: 0,
				heartbeat: 60,
				vhost: process.env.RABBITMQ_DEFAULT_VHOST,
			}
		).then(async (connection) => { 
			const channel = await connection.createChannel();
			console.log('[MQ] initialize');
			return { connection, channel };
		}).catch( async (error) => {
			throw error;
		});
	}
};
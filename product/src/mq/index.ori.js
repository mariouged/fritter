
import amqp from 'amqplib';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')});

const MQ = { connection: null, channel: null };

module.exports.initialize = async () => {
	if (MQ.connection && MQ.channel) {
		console.log('MQ', MQ);
		return MQ;
	}
	return await amqp.connect(
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
		MQ.connection = connection;
		MQ.channel = channel;
		return { connection, channel}
	}).catch( async (error) => {
		throw error;
	});
}

module.exports.consumeFromQueue = async (channel, queue, func) => {
	channel.consume(queue, async (msg) => {
		const data = JSON.parse(msg.content.toString());
		try {
			const response = await func(data);
			channel.ack(msg);
		} catch (error) {
			console.log('ERROR-consumeFromQueue: ', error);
		}
	});
}

module.exports.publishToQueue = async (channel, exchange, queue, routingKey, data) => {
	//const exchange = 'notification.service';
	//const queue = 'notification.product.create';
	//const routingKey = 'product.create';
	
	await channel.assertExchange(exchange, 'direct', {durable: true});
	await channel.assertQueue(queue, {durable: true});
	await channel.bindQueue(queue, exchange, routingKey);

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
};
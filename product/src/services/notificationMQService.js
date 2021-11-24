import MQ from '../mq';

const EXCHANGE = 'notifications';
const QUEUE = 'notification_products';
const ROUTINGKEY = 'notification_products';

const sendNotification = async (data, notificationType = '') => {
	if (!MQ.instance) {
		return null;
	}
	const { channel } = MQ.instance;
	try {
		await channel.assertExchange(EXCHANGE, 'direct', { durable: true });
		await channel.assertQueue(QUEUE, { durable: false });
		await channel.bindQueue(QUEUE, EXCHANGE, ROUTINGKEY);
		const msg = {
			type: notificationType,
			payload: data
		}
		//channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
		channel.publish(
			EXCHANGE,
			ROUTINGKEY,
			Buffer.from(JSON.stringify(msg)),
		);
	} catch (error) {
		console.log('ERROR-sendNotification-notificaciontMQService: ', error);
	}
};

module.exports = {
    sendNotification
}

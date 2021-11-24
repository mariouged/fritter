import MQ from '../mq';
import { ProductService } from '.';

module.exports.init = async () => {
	try {
		if (MQ.instance) {
			// product_create consumer
			productCreateConsumer('product_create', (input) => ProductService.create(input));
		}
	} catch (error) {
		console.log('[MQ] Error ProductMQ', error.message);
	}
};

const productCreateConsumer = async (queue, func) => {
	if (!MQ.instance) {
		return null;
	}
	const { channel } = MQ.instance;
	// Assert a queue into existence, if it doesn't exist then it will create one.
	await channel.assertQueue(queue, { durable: true });
	
	channel.consume(queue, async (msg) => {
		if(msg === null) {
			return;
		}
		const { content, properties } = msg;
		const data = JSON.parse(content.toString());
		try {
			await func(data);
			channel.ack(msg);
		} catch (error) {
			console.log('ERROR-consumeFromQueueProductCreate: ', error);
		}
	});
};

const amqplib = require('amqplib');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')});
const { v4: uuidv4 } = require('uuid');

const amqpUrl = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_QUEUE_PORT}/${process.env.RABBITMQ_DEFAULT_VHOST}`; //'amqp://172.16.240.14:5672'; //amqp://user:pass@host:10000/vhost

console.log(`Connect to ${amqpUrl}`);
(async () => {
  try {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    const channel = await connection.createChannel();
    
    try {
      const exchange = 'product_service_events';
      const queue = 'product_create';
      const routingKey = 'product_create';
      
      await channel.assertExchange(exchange, 'direct', {durable: true});
      // Assert a queue into existence.
      await channel.assertQueue(queue, {durable: true});
      await channel.bindQueue(queue, exchange, routingKey);
      
      console.log('Publishing products');
      // Create and publish products, if it doesn't exist then it will create one.
      for (let i = 0; i < 3; i++) {
        const msg = {
          'name': `Apple iPad ${i}`,
          'description': `An iPad is a tablet PC designed by Apple Inc. `,
          'price': 200.99 + i * 10
        };
        const correlationId = uuidv4();
        channel.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(msg)),
          { correlationId });
        console.log(correlationId);
        console.log(`Message published ${i}: ${JSON.stringify(msg)}`);
      }
      
    } catch(error) {
      console.error('Error in publishing message', error);
    } finally {
      console.info('Closing channel and connection if available');
      await channel.close();
      await connection.close();
      console.info('Channel and connection closed');
    }
  } catch(error) {
    console.log('Error:', error);
  }
  process.exit(0);
})();
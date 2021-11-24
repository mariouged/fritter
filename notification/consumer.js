const io = require('./socket');
const amqp = require('amqplib');

const connect = async () => {
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
        console.log('[MQ] initialize');
        return { connection, channel };
    }).catch( async (error) => {
        throw error;
    });
}

module.exports.init = async () => {
    try {
        const mq = await connect();
        notifyConsumer(mq, 'notification_products');
    } catch (error) {
        console.log('ERROR-initNotificationMQ: ', error);
    }
}

const notifyConsumer = async (mq, queue) => {
    if (!mq) {
        return;
    }
    const { channel } = mq;
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, async (msg) => {
        if (msg === null) {
            return;
        }
        const { content, properties } = msg;
        const data = JSON.parse(content.toString());
        console.log(data);
        const { type, payload } = data;
        io.socket.emit(type, payload);
        channel.ack(msg);
    })
};


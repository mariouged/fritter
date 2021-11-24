import MQ from './mq';
import { ProductMQService } from './services';

module.exports.startQueue = async () => {
    await MQ.initialize();
    ProductMQService.init();
};

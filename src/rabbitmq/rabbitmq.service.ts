import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
    private connection: amqp.ChannelModel;
    private channel: amqp.Channel;

    async onModuleInit() {
        try {
            this.connection = await amqp.connect({
                protocol: process.env.CURVI_RABBITMQ_PROTOCOL,
                hostname: process.env.CURVI_RABBITMQ_HOST,
                port: Number(process.env.CURVI_RABBITMQ_PORT),
                username: process.env.CURVI_RABBITMQ_USERNAME,
                password: process.env.CURVI_RABBITMQ_PASSWORD,
            });
            this.channel = await this.connection.createChannel();
            Logger.log(`RabbitMQ client connected successfully`, 'RabbitmqService');
        } catch (error: any) {
            Logger.error(`Failed to initialize RabbitMQ: ${error.message}`, 'RabbitmqService');
        }
    }

    async publishToExchange(exchange: string, routingKey: string, msg: string) {
        return this.channel.publish(exchange, routingKey, Buffer.from(msg));
    }

    async publishToQueue(queue: string, msg: string) {
        // const queue = 'hello';
        // const msg = 'Hello World!';

        //await this.channel.assertQueue(queue, {
        //    durable: true,
        //    arguments: {
        //        'x-queue-type': 'quorum'
        //    },
        //});

        this.channel.sendToQueue(queue, Buffer.from(msg));
        Logger.debug(`[x] Sent ${msg}`, 'RabbitmqService');
    }

    async recieveMessage(queue: string, callback: (msg: any) => void) {
        this.channel.consume(queue, (msg: any) => {
            callback(msg.content.toString());
            this.channel.ack(msg);
        });
    }
}

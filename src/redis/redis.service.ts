import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    private client: RedisClientType<{}, {}, {}, 3, {}>;

    async onModuleInit() {
        try {
            // Initialize the Redis client here
            this.client = createClient(); // Replace with actual Redis client initialization
            this.client.on('error', (err: any) => Logger.error(`Redis Client Error: ${err}`, 'RedisService'));
            await this.client.connect();
            Logger.log('Redis client connected successfully', 'RedisService');
        } catch (error: any) {
            Logger.error(`Failed to initialize Redis: ${error.message}`, 'RedisService');
        }
    }

    async get(key: string) {
        return await this.client.get(key);
    }

    async set(key: string, value: string) {
        await this.client.set(key, value);
    }

    async del(key: string) {
        await this.client.del(key);
    }
}

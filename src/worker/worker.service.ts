import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service.js';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service.js';
import { RoutingKeyEnum } from '../rabbitmq/enums/routing-key.enum.js';
import { Cron, Interval } from '@nestjs/schedule';
import { NodemailerService } from '../nodemailer/nodemailer.service.js';
import { JwtService } from '@nestjs/jwt';
import { RedisKey } from '../redis/enum/redis-key.enum.js';

@Injectable()
export class WorkerService {
    constructor(
        private readonly rabbitmqService: RabbitmqService,
        private readonly nodemailerService: NodemailerService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) { }

    @Interval(1000 * 30)
    async resetPasswordWorker() {
        const queue = RoutingKeyEnum.RESET_PASSWORD;
        const callback = async (msg: string) => {
            const { id, email, plan } = JSON.parse(msg);
            const payload = { sub: id, email, plan };
            const token = this.jwtService.sign(payload, { expiresIn: '15m' });

            await this.redisService.set(`${RedisKey.USER_SESSION}:${id}`, token);
            
            Logger.debug(`Enviando email para: ${email}`, 'WorkerService');

            this.nodemailerService.sendMail(
                email,
                'Curvi - Redefinição de senha',
                'Clique no link para redefinir sua senha. Link expira em 15 minutos.',
                `<p>Clique no link para <a href="${process.env.CURVI_URL_RESET_PASSWORD}?t=${token}&&e=${email}" target="_blank">redefinir sua senha</a>. Link expira em 15 minutos.</p>`
            );

        }

        await this.rabbitmqService.recieveMessage(queue, callback);
    }
} 

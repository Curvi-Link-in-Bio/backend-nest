import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service.js';

@Module({
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}

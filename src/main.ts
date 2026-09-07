import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.CURVI_PORT ?? 3000);
  Logger.log(`Application is running on port ${process.env.CURVI_PORT ?? 3000}`, 'Bootstrap');
}
await bootstrap();

import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Config } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const configService = app.get(ConfigService<Config>);
  const port = configService.get('port');
  Logger.log(`Starting orders service on port: ${port} in [${configService.get('nodeEnv')}] environment`, 'OrdersBootstrap');
  await app.listen(port);
}
bootstrap();

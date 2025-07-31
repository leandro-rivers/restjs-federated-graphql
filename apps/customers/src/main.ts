import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomersModule } from './customers.module';
import { Config } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  // Get the ConfigService to access configuration
  const configService = app.get(ConfigService<Config>);
  const port = configService.get('port');
  Logger.log(`Starting customers service on port: ${port} in [${configService.get('nodeEnv')}] environment`, 'CustomersBootstrap')
  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Config } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Add a delay to allow subgraph services to start first
  const startupDelay = parseInt(process.env.STARTUP_DELAY ?? '5000', 10);
  Logger.log(`Waiting ${startupDelay}ms for subgraph services to start...`, 'GatewayBootstrap');
  await new Promise(resolve => setTimeout(resolve, startupDelay));

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Config>);
  const port = configService.get('port');
  Logger.log(`Starting gateway service on port: ${port} in [${configService.get('nodeEnv')}] environment`, 'GatewayBootstrap');
  Logger.log(`Subgraphs: ${JSON.stringify(configService.get('subgraphsConfigs'))}`, 'GatewayBootstrap');
  await app.listen(port);
}
bootstrap();

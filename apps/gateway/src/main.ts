import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Add a delay to allow subgraph services to start first
  console.log('Waiting for subgraph services to start...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

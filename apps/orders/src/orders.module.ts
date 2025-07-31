import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { OrdersResolver, CustomerResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import * as path from 'path';
import configuration from './config/configuration';

const appName = 'orders';
const appPath = path.join(process.cwd(), 'apps', appName);
const envFilePaths = [path.join(appPath, '.env.local'), path.join(appPath, '.env')];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePaths,
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  controllers: [],
  providers: [OrdersResolver, CustomerResolver, OrdersService],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import configuration from './config/configuration';
import * as path from 'path';

const appName = 'customers';
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
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}

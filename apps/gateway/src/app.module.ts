import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import * as path from 'path';
import configuration from './config/configuration';

const appName = 'gateway';
const appPath = path.join(process.cwd(), 'apps', appName);
const envFilePaths = [path.join(appPath, '.env.local'), path.join(appPath, '.env')];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePaths,
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: configService.get('subgraphsConfigs') ?? [],
              introspectionHeaders: {
                'User-Agent': 'Apollo Federation Gateway',
              },
            }),
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'orders', url: 'http://localhost:3001/graphql' },
            { name: 'customers', url: 'http://localhost:3002/graphql' },
          ],
          introspectionHeaders: {
            'User-Agent': 'Apollo Federation Gateway',
          },
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

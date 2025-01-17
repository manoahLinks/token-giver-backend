import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { handleDonationReceivedService } from './donation.service';
import { getEnvPath } from './common/utils';
import { PrismaModule } from './prisma/prisma.module';
import { SharedIndexerModule } from './shared-indexer/shared-indexer.module';
import { TokenGiverIndexerModule } from './token-giver-indexer/token-giver-indexer.module';
import { ResolversModule } from './resolvers/resolvers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvPath() }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    SharedIndexerModule,
    TokenGiverIndexerModule,
    ResolversModule,
  ],
  controllers: [AppController],
  providers: [AppService, handleDonationReceivedService],
})
export class AppModule {}

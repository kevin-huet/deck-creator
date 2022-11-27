import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HearthstoneModule } from './hearthstone/hearthstone.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { HearthstoneDataCommand } from './command/hs.data.command';
import { AuthModule } from './auth/auth.module';
import { UserCreateCommand } from './command/user.create.command';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { CsrfMiddleware } from './middleware/csrf.middleware';
import { CreateCardCommand } from './command/hs.cards.command';

@Module({
  imports: [
    CommandModule,
    AuthModule,
    HearthstoneModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    PrismaService,
    AppService,
    UserCreateCommand,
    HearthstoneDataCommand,
    CreateCardCommand,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CsrfMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

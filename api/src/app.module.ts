import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HearthstoneModule } from './hearthstone/hearthstone.module';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { HearthstoneDataCommand } from './command/hs.data.command';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserCreateCommand } from './command/user.create.command';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { MailService } from './mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { CsrfMiddleware } from './middleware/csrf.middleware';
import { CreateCardCommand } from "./command/hs.cards.command";

@Module({
  imports: [
    UserModule,
    HearthstoneModule,
    CommandModule,
    AuthModule,
    ConfigModule.forRoot(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    MailService,
    JwtService,
    AppService,
    UserService,
    AuthService,
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

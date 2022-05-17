import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HearthstoneModule } from './hearthstone/hearthstone.module';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from "nestjs-command";
import { UserCommand } from "./command/hs.data.command";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, HearthstoneModule, CommandModule, AuthModule, ConfigModule.forRoot(), MailModule],
  controllers: [],
  providers: [AppService, UserCommand],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";
import { MailService } from "../mail/mail.service";
import * as dayjs from "dayjs";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '7d'}
    })],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy, MailService],
  exports: [AuthService]
})
export class AuthModule {}

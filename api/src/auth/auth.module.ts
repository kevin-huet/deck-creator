import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { DiscordStrategy } from './strategies/discord.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthProvider } from './providers/auth.provider';
import { HttpModule } from '@nestjs/axios';
import { StorageProvider } from './providers/storage.provider';

@Module({
  imports: [PassportModule, ConfigModule.forRoot(), HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    DiscordStrategy,
    ConfigService,
    AuthProvider,
    StorageProvider,
  ],
  exports: [AuthService],
})
export class AuthModule {}

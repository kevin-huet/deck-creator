import { Module } from '@nestjs/common';
import { HearthstoneService } from './hearthstone.service';
import { HearthstoneController } from './hearthstone.controller';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HearthstoneController],
  providers: [HearthstoneService, PrismaService, ConfigService],
})
export class HearthstoneModule {}

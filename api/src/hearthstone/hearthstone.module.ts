import { Module } from '@nestjs/common';
import { HearthstoneService } from './hearthstone.service';
import { UserController } from "../user/user.controller";
import { HearthstoneController } from "./hearthstone.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [HearthstoneController],
  providers: [HearthstoneService, PrismaService]
})
export class HearthstoneModule {}

import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(data: Prisma.UserCreateInput) {
    data.verificationCode = await Math.floor(100000 + Math.random() * 999999).toString();
    return this.prisma.user.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where, data })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {

  }

  async findOne(params: { id?: number, email?: string, username?: string, verificationCode?: string }) {
    return this.prisma.user.findUnique({
      where: params
    })
  }
}

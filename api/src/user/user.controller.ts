import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User as UserModel } from "@prisma/client";
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    //this.userService.getUser();
  }

  @Put('password')
  changePassword() {

  }

  @Put('avatar')
  changeAvatar() {

  }

  @Post('create')
  async createUser(@Body() userData: { username: string; email: string, password: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}

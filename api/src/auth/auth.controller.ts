import { Controller, Get, Post, UseGuards, Request, Body, HttpException, HttpStatus, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UserDto } from "../user/dto/user.dto";
import { Response } from "express";
import * as dayjs from 'dayjs'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { jwt, user } = await this.authService.login(req.body);
    res.cookie('Authentication', jwt, {
      expires: dayjs().add(7,'days').toDate()
    })
    res.status(200).json({ user: user });
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    const {username, email, password, terms} = body;
    if (body.passwordCheck !== password)
      throw new HttpException('the two passwords are not identical', HttpStatus.BAD_REQUEST);
    try {
      await this.authService.createUser({username, email, password, terms});
    } catch (e) {
      throw new HttpException('username or email already use', HttpStatus.CONFLICT);
    }
    return { username, email }
  }

  @Post('code')
  async verificationCode(@Body() body) {
    const result = await this.authService.verificationCode(body.email, body.code);
    if (result.error)
      throw new HttpException(result.message, HttpStatus.CONFLICT)
    return result.message
  }

  @Post('send_code')
  async sendNewVerificationCode(@Body() body) {
    const result = await this.authService.sendVerificationCode(body.email);
    if (result.error) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }
    return result.message;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user_info')
  getUserInfo(@Request() req) {
    return {
      user: req.user
    }
  }
}

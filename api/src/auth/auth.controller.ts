import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService, EXISTED } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import * as dayjs from 'dayjs';
import { RealIP } from 'nestjs-real-ip';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@RealIP() ip, @Body() body, @Res() res: Response) {
    const { jwt, user } = await this.authService.login(body, ip);
    res.cookie('Authentication', jwt, {
      expires: dayjs().add(7, 'days').toDate(),
    });
    return res.status(200).json({ user: user });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('Authentication', null, {
      expires: dayjs().toDate(),
    });
    return res.status(200).json({});
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    const { username, email, password, terms, confirmPassword } = body;
    if (confirmPassword !== password)
      throw new HttpException(
        'the two passwords are not identical',
        HttpStatus.BAD_REQUEST,
      );
    await this.authService.createUser({ username, email, password, terms });
    return { username, email };
  }

  @Post('code')
  async verificationCode(@Body() body) {
    const result = await this.authService.verificationCode(
      body.email,
      body.code,
    );
    if (result.error)
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    return result.message;
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
  @Get('user')
  async getUserInfo(@Request() req) {
    return {
      user: req.user,
    };
  }

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(@Req() req) {}

  @Get('discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(@Req() req, @Res() res) {
    console.log(req);
    if (!req.user) {
      return 'No user from discord';
    }
    const { email, username, discriminator } = req.user;
    const { user, status } = await this.authService.createSocialUser({
      email,
      username: username + discriminator,
      socialLogin: 'DISCORD',
    });
    const jwt = this.authService.generateToken(user.id);
    res.cookie('Authentication', jwt, {
      expires: dayjs().add(7, 'days').toDate(),
    });
    if (status === EXISTED) {
      return res.redirect('http://localhost:8000/');
    }
    return res.redirect('http://localhost:8000/');
  }
}

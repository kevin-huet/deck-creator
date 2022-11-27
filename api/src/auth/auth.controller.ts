import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService, EXISTED } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import * as dayjs from 'dayjs';
import { RealIP } from 'nestjs-real-ip';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDTO, VerificationCodeRequestDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @RealIP() ip,
    @Body() body,
    @Res() res: Response,
  ): Promise<object> {
    const result = await this.authService.login(body);
    res.cookie('Authentication', result.data.token);
    return res.status(200).json({
      ...result.data.user,
    });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('Authentication', null, {
      expires: dayjs().toDate(),
    });
    return res.status(200).json({});
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDTO) {
    return this.authService.register(body);
  }

  @Post('code')
  async verificationCode(@Body() body: VerificationCodeRequestDTO) {
    return this.authService.verifyCode(body);
  }

  @Post('send_code')
  async sendVerificationCode(@Body() body: { email: string }): Promise<object> {
    const result = await this.authService.sendVerificationCode(body.email);
    return result?.data;
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
    if (!req.user) {
      return 'No user from discord';
    }
    //return res.redirect('http://localhost:8000/');
  }
}

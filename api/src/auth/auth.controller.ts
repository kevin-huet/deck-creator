import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  Res,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import * as dayjs from 'dayjs';
import { RealIP } from 'nestjs-real-ip';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDTO, VerificationCodeRequestDTO } from './auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './decorator/roles.decorator';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.authService.upload(file);
  }

  @Get('upload')
  async getFile(@Query() query) {
    const result = await this.authService.getFile(query);
    return result.image;
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
  async discordAuth(@Query('code') code) {
    const result: any = await this.authService.getUserDiscord(code);
    const user = await this.authService.getUser(result.data?.access_token);
    console.log(user);
  }

  @Get('discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(@Req() req, @Res() res) {
    if (!req.user) {
      return 'No user from discord';
    }
    return res.redirect('http://localhost:8000/');
  }

  @Patch('user/images')
  async changeImage(@Body() body) {
    return '';
  }
}

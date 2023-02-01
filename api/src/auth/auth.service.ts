import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  ResponseDTO,
  VerificationCodeRequestDTO,
} from './auth.dto';
import jwt_decode from 'jwt-decode';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export const CREATED = 1;
export const EXISTED = 2;

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    @Inject('STORAGE_SERVICE') private clientStorage: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  public async register(body: RegisterRequestDTO): Promise<ResponseDTO> {
    const result = await this.client.send('REGISTER', { ...body }).toPromise();
    if (result?.status !== HttpStatus.OK) {
      throw new HttpException(result?.error, result?.status);
    }
    return;
  }

  public async captchaIsValid(captcha: string) {
    const result = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6LelcPkiAAAAAI5c1kDZCjiNX-kVdK1dn9_ahlUo&response=${captcha}`,
      )
      .toPromise();
    return !!result.data?.success;
  }

  public async login(body: LoginRequestDTO): Promise<ResponseDTO> {
    if (!(await this.captchaIsValid(body.captcha))) {
      throw new HttpException('Invalid Captcha', HttpStatus.BAD_REQUEST);
    }
    const result = await this.client.send('LOGIN', { ...body }).toPromise();
    if (result?.status !== HttpStatus.OK) {
      throw new HttpException(result?.error, result?.status);
    }
    if (!result?.token) {
      throw new HttpException('Token not created', HttpStatus.BAD_GATEWAY);
    }
    const user = jwt_decode(result?.token);
    return {
      status: HttpStatus.OK,
      data: { token: result?.token, user: user },
    };
  }

  public async verifyCode(
    body: VerificationCodeRequestDTO,
  ): Promise<ResponseDTO> {
    const result = await this.client
      .send('VERIFY_CODE', { ...body })
      .toPromise();
    if (result?.status !== HttpStatus.OK) {
      throw new HttpException(result?.error, result?.status);
    }
    return;
  }

  async sendVerificationCode(email: string): Promise<ResponseDTO> {
    const result = await this.client
      .send('SEND_ANOTHER_VERIFICATION_CODE', { email })
      .toPromise();
    if (result?.status !== HttpStatus.OK) {
      throw new HttpException(result?.error, result?.status);
    }
    return;
  }

  async validate(token: string) {
    return this.client.send('VALIDATE', { token }).toPromise();
  }

  async getUserDiscord(code) {
    const clientID = process.env.DISCORD_APP_ID;
    const clientSecret = process.env.DISCORD_APP_SECRET;
    const data = {
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8000/auth/login',
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.httpService
      .post('https://discord.com/api/oauth2/token', data, {
        headers,
      })
      .toPromise();
  }

  async getUser(access_token: string) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log(access_token);
    return this.httpService
      .get('https://discord.com/api/users/@me', {
        headers: {
          ...headers,
          Authorization: `Bearer ${access_token}`,
        },
      })
      .toPromise();
  }

  async upload(file: Express.Multer.File): Promise<any> {
    const base64Image = file.buffer.toString('base64');
    try {
      return await lastValueFrom(
        this.clientStorage.send('ADD_FILE', {
          file: base64Image,
          filename: file.originalname,
          appName: 'deck',
        }),
      );
    } catch (e) {
      throw new HttpException(e, 403);
    }
  }

  async getFile(query) {
    try {
      return await lastValueFrom(
        this.clientStorage.send('GET_FILE', {
          filename: query.filename,
        }),
      );
    } catch (e) {
      throw new HttpException(e, 403);
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User as UserModel } from 'prisma';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Closeable,
  Transport,
} from '@nestjs/microservices';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  ResponseDTO,
  VerificationCodeRequestDTO,
} from './auth.dto';

export const CREATED = 1;
export const EXISTED = 2;

@Injectable()
export class AuthService {
  private client: ClientProxy & Closeable;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3008,
      },
    });
  }

  public async register(body: RegisterRequestDTO): Promise<ResponseDTO> {
    this.client.send('REGISTER', { ...body });
    return;
  }

  public async login(body: LoginRequestDTO): Promise<ResponseDTO> {
    this.client.send('LOGIN', { ...body });
    return;
  }

  public async verifyCode(
    body: VerificationCodeRequestDTO,
  ): Promise<ResponseDTO> {
    this.client.send('VERIFY_CODE', { ...body });
    return;
  }

  async sendVerificationCode(email: string): Promise<ResponseDTO> {
    this.client.send('SEND_CODE', { email });
    return;
  }
}

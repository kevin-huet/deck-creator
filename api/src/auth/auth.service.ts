import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { User as UserModel } from 'prisma';
import { Prisma } from "@prisma/client";
import { MailService } from "../mail/mail.service";
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private mailService: MailService, private jwt: JwtService){}

  public async createUser(data: Prisma.UserCreateInput) {
    data.password = this.encodePassword(data.password);
    const user = await this.usersService.createUser(data);
    if (user) {
      await this.mailService.sendUserConfirmation(user);
      return user;
    }
    return null;
  }

  public async login(body: { email: string, password: string }): Promise<any> {
    const { email, password } = body;
    const user: UserModel = await this.usersService.findOne({ email });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid: boolean = this.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    //this.repository.update(user.id, { lastLoginAt: new Date() });
    const jwt = this.generateToken(user);
    user.password = undefined;
    user.verificationCode = undefined;
    return { jwt: jwt, user: user };
  }

  public async verificationCode(email: string, code: string) {
    const user = await this.usersService.findOne({ email });

    if (!user)
      return { error: true, message: 'email not exist in database' };
    if (user.verified)
      return { error: true, message: 'User already verified' };
    if (user.verificationCode !== code)
      return { error: true, message: 'Invalid code' };
    await this.usersService.updateUser({ where: { id: user.id }, data: { verified: true } });
    return { error: false, message: 'User has been verified' }
  }

  public async refresh(user: UserModel): Promise<string> {
    //this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.generateToken(user);
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<UserModel> {
    return this.usersService.findOne({ id: decoded.id });
  }

  // Generate JWT Token
  public generateToken(user: UserModel): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: UserModel = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  public async sendVerificationCode(email: string) {
    const user = await this.usersService.findOne({ email });

    if (!user)
      return { error: true, message: 'User not exist' };
    if (user.verified)
      return { error: true, message: 'User already verified' };
    await this.mailService.sendUserConfirmation(user);
    return { error: false, message: 'code send' };
  }
}

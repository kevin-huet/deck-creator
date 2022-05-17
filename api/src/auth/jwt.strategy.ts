import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Request } from "express";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: { id: number, email: string, iat: number, exp: number }) {
    console.log(payload);
    if (payload.id && payload.email) {
      const user = await this.userService.findOne({ id: payload.id })
      user.password = undefined;
      user.verificationCode = undefined;
      return user;
    }
    return null;
  }
}

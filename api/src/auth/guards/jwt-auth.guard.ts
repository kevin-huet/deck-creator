import {
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidateRequestDTO } from '../auth.dto';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @Inject(AuthService)
  public readonly service: AuthService;
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    const req = context.switchToHttp().getRequest();

    if (!req.cookies || !req.cookies?.Authentication) {
      throw new UnauthorizedException();
    }
    const { status, user }: ValidateRequestDTO = await this.service.validate(
      req.cookies.Authentication,
    );
    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }
    req.user = user;
    return true;
  }
}

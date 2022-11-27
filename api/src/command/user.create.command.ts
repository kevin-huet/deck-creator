import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserCreateCommand {
  constructor(private authService: AuthService) {}

  @Command({
    command: 'user:create',
    describe: 'get and add/update all hearthstone data',
  })
  async create(
    @Positional({
      name: 'email',
      type: 'string',
    })
    email: string,
    @Positional({
      name: 'username',
      type: 'string',
    })
    username: string,
    @Positional({
      name: 'password',
      type: 'string',
    })
    password: string,
  ) {}
}

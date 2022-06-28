import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserCreateCommand {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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
  ) {
    password = this.authService.encodePassword(password);
    const result = await this.userService.createUser({
      email,
      username,
      password,
      terms: true,
      verified: true,
    });
    console.log(result);
  }
}

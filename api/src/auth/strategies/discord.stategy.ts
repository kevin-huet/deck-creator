import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VerifyCallback, Strategy } from 'passport-discord';
import { Profile } from 'passport';
// change these to be your Discord client ID and secret
const clientID = process.env.DISCORD_APP_ID;
const clientSecret = process.env.DISCORD_APP_SECRET;
const callbackURL = 'http://localhost:3000/auth/discord/redirect';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: ['identify'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile);
  }
}

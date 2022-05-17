import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { User as UserModel } from 'prisma';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserModel) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'verification', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        username: user.username,
        code: user.verificationCode,
      },
    });
  }
}

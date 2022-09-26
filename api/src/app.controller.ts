import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('csrf')
  getCsrfToken(@Req() req, @Res() res): string {
    const csrf = req.csrfToken();
    return res.status(HttpStatus.OK).json({ csrf });
  }
}

import { Body, Controller, Post, Redirect, Req, Res } from '@nestjs/common';
import type {
  FastifyRequest as Request,
  FastifyReply as Response,
} from 'fastify';

import { AuthService } from './auth/auth.service';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

class SignUpForm {
  @IsNotEmpty({ message: 'Name is not valid' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least 8 characters, one letter, one number and one symbol',
    },
  )
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Redirect()
  async login(@Req() req: Request, @Res() res: Response) {
    await this.authService.login(req, res);
    return { url: '/' };
  }

  @Post('/logout')
  @Redirect()
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req, res);
    return { url: '/login' };
  }

  @Post('/sign-up')
  @Redirect()
  async signup(
    @Body() form: SignUpForm,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { email, password, name } = form;
    await this.authService.signup(email, password, name);
    await this.authService.login(req, res);
    return { url: '/' };
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';

@Catch(UnauthorizedException)
export class AuthFilter implements ExceptionFilter {
  catch(_: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    void res.redirect(302, '/login');
  }
}

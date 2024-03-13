import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (
      request.url == '/login' ||
      request.url == '/sign-up' ||
      request.url.startsWith('/_next/static/') ||
      request.url.startsWith('/_next/webpack-hmr')
    )
      return true;
    const response = context.switchToHttp().getResponse<Response>();
    await this.authService.authorize(request, response);
    return true;
  }
}

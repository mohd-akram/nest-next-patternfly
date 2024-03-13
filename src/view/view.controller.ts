import { Controller, Get, Req, Res } from '@nestjs/common';

import { ViewService } from './view.service.js';
import type { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class ViewController {
  constructor(private nextService: ViewService) {}
  @Get(['/*'])
  async static(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ): Promise<void> {
    const handle = this.nextService.getNextServer().getRequestHandler();
    await handle(req.raw, res.raw);
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next.js';

@Injectable()
export class ViewService implements OnModuleInit {
  private server!: NextServer;

  async onModuleInit(): Promise<void> {
    this.server = next({
      dev: process.env.NODE_ENV != 'production',
    });
    await this.server.prepare();
  }

  getNextServer(): NextServer {
    return this.server;
  }
}

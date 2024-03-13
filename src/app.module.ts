import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ViewModule } from './view/view.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './auth/user.entity.js';
import Session from './auth/session.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      entities: [User, Session],
      synchronize: true,
    }),
    AuthModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

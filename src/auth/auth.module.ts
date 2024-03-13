import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthFilter } from './auth.filter';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import Session from './session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AuthFilter,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

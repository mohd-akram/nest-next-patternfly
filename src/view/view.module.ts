import { Module } from '@nestjs/common';
import { ViewService } from './view.service.js';

import { ViewController } from './view.controller.js';

@Module({
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}

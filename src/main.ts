import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module.js';
import fastifyCookie from '@fastify/cookie';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory(errors) {
        return new BadRequestException(
          Object.fromEntries(
            errors.map((error) => [
              error.property,
              error.constraints[Object.keys(error.constraints)[0]],
            ]),
          ),
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const FRONT_END_ORIGIN = process.env.FRONT_END_ORIGIN;
  
  app.enableCors({
    origin: FRONT_END_ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
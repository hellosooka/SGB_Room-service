import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.SERVER_PORT;

  await app.listen(PORT ? PORT : '3000');
  console.log(`Server started on ${PORT}`);
}
bootstrap();

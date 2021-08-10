import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSql } from './db';

async function bootstrap() {
  initSql();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { initialiseSql } from './db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initialiseSql();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Parking Lot API')
      .setDescription('Alocate Lots to incoming cars')
      .setVersion('1.0')
      .addTag('car')
      .build(),
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

import {AppModule} from 'app.module'
import {INestApplication} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().
          setTitle('Parking Lot API').
          setDescription('Alocate Lots to incoming cars').
          setVersion('1.0').
          addTag('car').
          addTag('lot').
          addTag('parking').
          build(),
  )
  SwaggerModule.setup(
      'api',
      app,
      document
  )
}

export const bootstrap = () => NestFactory.create(AppModule)

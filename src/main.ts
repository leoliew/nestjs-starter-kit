import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, RequestMethod } from '@nestjs/common';
import { SwaggerConfig } from './common/interfaces/config.interface';

async function bootstrap() {
  // get environment config
  const port = config.get('port') as number;
  const swaggerConfig = config.get('swagger') as SwaggerConfig;

  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // API default prefix
  app.setGlobalPrefix('/api/v1/', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  // allow cors
  app.enableCors();

  // swagger document setup
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [swaggerConfig.swaggerUser]: swaggerConfig.swaggerPassword,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription('The NestJs API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port);
  Logger.log(
    `Application(${process.env.NODE_ENV}) is running on: ${await app.getUrl()}`,
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/validation/validation.pipe';
import * as basicAuth from 'express-basic-auth';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const port = config.get('port');
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // API 默认前缀
  app.setGlobalPrefix('/api/v1/', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  // 跨域设置
  app.enableCors();

  // swagger 文档设置
  app.use(
    ['/api/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [config.get('swagger.swagger_user')]: config.get(
          'swagger.swagger_password',
        ),
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

  // error handler and response format
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(
    `Application(${process.env.NODE_ENV}) is running on: ${await app.getUrl()}`,
  );
}
bootstrap();

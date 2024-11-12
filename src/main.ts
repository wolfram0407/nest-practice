import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const port = configService.get<number>('PORT');
  const serviceName = configService.get<string>('SERVICE_NAME');

  const config = new DocumentBuilder()
    .setTitle(`${serviceName} API Docs`)
    .setDescription(`${serviceName} API 문서입니다.`)
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(port);

  console.log('MONGODB_URI:', process.env.MONGODB_URI);  // MONGODB_URI 로그 확인
}

bootstrap();

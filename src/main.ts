import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = app.get(ConfigService).get('MODE') === 'PROD';
  app.setGlobalPrefix('/api/v'+app.get(ConfigService).get('API_VERSION')); // Setting base path
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ));

  if (!isProduction) {
    const options = new DocumentBuilder()
      .setTitle('Tslen API Documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
  }
  await app.listen(app.get(ConfigService).get('APP_PORT'));
}
bootstrap();

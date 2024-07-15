import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap () {
    const app = await NestFactory.create(AppModule);
    const isProduction = app.get(ConfigService).get('MODE') === 'PROD';

    const whitelistOrigin = [app.get(ConfigService).get('FRONT_DOMAIN')];
    app.enableCors({
        origin: function (origin, callback) {
            if (whitelistOrigin.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'), false)
            }
        },
        allowedHeaders: 'Authorization, Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS, PATCH",
        credentials: true,
    });
    app.setGlobalPrefix('/api/v' + app.get(ConfigService).get('API_VERSION')); // Setting base path

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // interceptors
    app.useGlobalInterceptors(new TimeoutInterceptor());

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

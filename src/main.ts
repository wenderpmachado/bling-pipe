import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setAPIVersion(app, configService);
  bootstrapOpenAPI(app, configService);

  const port = configService.get('API_PORT') || 3000;
  await app.listen(port);
}

function bootstrapOpenAPI(app: INestApplication, configService: ConfigService) {
  const versionNumber = configService.get('API_VERSION') || 1;
  const version = `v${versionNumber}.0`;

  const options = new DocumentBuilder()
    .setTitle(configService.get('API_TITLE'))
    .setDescription(configService.get('API_DESCRIPTION'))
    .setVersion(version)
    // .addTag()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

function setAPIVersion(app: INestApplication, configService: ConfigService) {
  const versionNumber = configService.get('API_VERSION') || 1;
  const version = `v${versionNumber}`;
  app.setGlobalPrefix(version);
}

bootstrap();
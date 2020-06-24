import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  configMiddlewares(app, configService);
  setAPIVersion(app, configService);
  configOpenAPI(app, configService);

  const port = process.env.PORT || configService.get('API_PORT') || 3000;
  await app.listen(port);
}

function configOpenAPI(app: INestApplication, configService: ConfigService) {
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

function configMiddlewares(app: INestApplication, configService: ConfigService) {
  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: configService.get<number>('API_RATE_LIMIT'), // default: 15 minutes
      max: configService.get<number>('API_RATE_LIMIT_MAX'), // limit each IP to 100 requests per windowMs
    }),
  )
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCsrf from '@fastify/csrf-protection';

import { AppModule } from '@/app.module';
import { AppUtils } from '@/common/utils/app.util';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async csrfProtection(req, reply, _done) {
        const token = reply.generateCsrf();
        console.log(token, req.headers);
        return req.headers['csrf-token'];
      },
    }),
  );
  AppUtils.killAppWithGrace(app);
  /**
   * ------------------------------------------------------
   * Security
   * ------------------------------------------------------
   */
  await app.register(helmet);
  await app.register(compression, {
    global: true,
    threshold: 1,
    encodings: ['gzip', 'deflate'],
  });
  await app.register(fastifyCsrf, {
    sessionPlugin: '@fastify/secure-session',
    getToken: function (req: any) {
      console.log(req.headers);
      return req.headers['csrf-token'];
    },
  });

  /**
   * ------------------------------------------------------
   * Global Config
   * ------------------------------------------------------
   */
  app.enableCors({
    origin: '*',
    methods: '*',
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  /**
   * ------------------------------------------------------
   * Swagger
   * ------------------------------------------------------
   */
  const config = new DocumentBuilder()
    .setTitle('Escriba')
    .setDescription('Escriba RestAPI documentation and examples')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT, '0.0.0.0', (err, address) => {
    if (err) {
      throw err;
    }
    console.log('listening on: ' + address);
  });
}
bootstrap();

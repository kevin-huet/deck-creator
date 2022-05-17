import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // @ts-ignore
  app.use(helmet());
  app.enableCors(
    {
      origin: ['http://localhost:8000'],
      methods: ['POST', 'PUT', 'DELETE', 'GET'],
      credentials: true,
      allowedHeaders: 'X-Requested-With, X-CSRF-Token, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    }
  );
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('DeckCreator')
    .setDescription('The DeckCreator API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey  });
  SwaggerModule.setup('api', app, document);
  //app.use(csurf({ cookie: { httpOnly: true }}));
  await app.listen(3000);
}
bootstrap();

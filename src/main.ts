import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Borra lo que no esté en el DTO
    forbidNonWhitelisted: true, // Lanza error si mandan datos extra
    transform: true, // Convierte tipos automáticamente
  }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter));

  const config = new DocumentBuilder()
  .setTitle('Gamer Vault API')
  .setDescription('Mi colección personal de videojuegos platinados')
  .setVersion('1.0')
  .addTag('Games')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

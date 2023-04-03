import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // * Hace la limpieza de los valores que vengan por exceso
      forbidNonWhitelisted: true, // * Emite un error cuando vienen valores por exceso
    }),
  );

  await app.listen(3000);
}
main();

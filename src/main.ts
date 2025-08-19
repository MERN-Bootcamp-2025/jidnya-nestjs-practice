//this is the entry point of nest application
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //AppModule is the root container, important line

  //adding validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strip unknown fields. meaning: if dto has name and client sends name and role, role will be stripped.
      forbidNonWhitelisted: true, //400 on unknown fields
      transform: true, //if dto expects age as 25, but requests sends age in "25", it will transform "25" to 25
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//points to remember
//pipe in nestjs is a class.

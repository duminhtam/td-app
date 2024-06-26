import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     // skipMissingProperties: true,
  //     // forbidUnknownValues: false,
  //   }),
  // );
  //
  // app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  app.enableCors();
  await app.listen(3002);
}
bootstrap();

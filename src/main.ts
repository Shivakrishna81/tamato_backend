import { ApplicationConfig, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetUp } from './core/swagger/doc.swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './logger/global-exception';
import { AppLogger } from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port=process.env.PORT ?? 3000
  app.enableCors()
  SwaggerSetUp(app)
  
  const appLogger = app.get(AppLogger);
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalFilters(new GlobalExceptionFilter(appLogger))
  await app.listen(port);
  console.log(`Port:${port}`)
}
bootstrap();

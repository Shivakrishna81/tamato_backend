import { ApplicationConfig, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetUp } from './core/swagger/doc.swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './core/logger/global-exception';
import { AppLogger } from './core/logger/logger';
import { Sequelize } from 'sequelize-typescript';
import * as cors from 'cors';
import { ResponseHandler } from './core/middleware/response-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port=process.env.PORT ?? 3000
  app.enableCors()
  SwaggerSetUp(app)
  
  const appLogger = app.get(AppLogger);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))

  app.useGlobalFilters(new GlobalExceptionFilter(appLogger)) 
  
  // app.useGlobalInterceptors(new ResponseHandler())
  // const sequelize = app.get(Sequelize);
    
  // await sequelize.sync({ force: true }); 

  await app.listen(port);
  console.log(`Port:${port}`)
} 
bootstrap();

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function SwaggerSetUp(app:INestApplication){
    const config=new DocumentBuilder() 
    .setTitle("Tamata Restuarant API's")
    .setDescription("Nestjs code to perform CRUD operations")
    .setVersion('1.0')
    .addBearerAuth()
    .build(); 

    const document=SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('swagger',app,document)
}
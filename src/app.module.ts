import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusModule } from './modules/menus/menus.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartModule } from './modules/cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config/appconfig.service';
import { AppLogger } from './logger/logger';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
  MenusModule, UsersModule, OrdersModule, CartModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService,AppConfigService,AppLogger],

})
export class AppModule {}

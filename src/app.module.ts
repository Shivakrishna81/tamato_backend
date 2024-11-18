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
import { AppLogger } from './core/logger/logger';
import { CategoryModule } from './modules/category/category.module';
import { AddressModule } from './modules/address/address.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
  CartModule,
  MenusModule, UsersModule, OrdersModule, CartModule, DatabaseModule, CategoryModule, AddressModule,CoreModule],
  controllers: [AppController],
  providers: [AppService,AppConfigService,AppLogger],

})
export class AppModule {}

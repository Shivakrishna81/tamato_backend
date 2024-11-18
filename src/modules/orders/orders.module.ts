import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CartModule } from '../cart/cart.module';
import { AbstractOrderService } from './orders.abstract';

@Module({
  imports: [ CartModule],
  providers: [{
    provide: AbstractOrderService,
    useClass: OrdersService
  }],
  controllers: [OrdersController],
  exports: [{
    provide: AbstractOrderService,
    useClass: OrdersService
  }]
})
export class OrdersModule { }

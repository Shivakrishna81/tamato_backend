import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AbstractCartService } from './cart.abstract';

@Module({
  imports:[],
  providers: [CartService,{
    provide:AbstractCartService,
    useClass:CartService
  }],
  controllers: [CartController],
  exports:[CartService,{
    provide:AbstractCartService,
    useClass:CartService
  }]
})
export class CartModule {}

import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { DatabaseModule } from 'src/database/database.module';
import { AbstractAddressService } from './address.abstract';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [
    {
      provide: AbstractAddressService,
      useClass: AddressService
    }],
  exports: [
    {
      provide: AbstractAddressService,
      useClass: AddressService
    }]
})
export class AddressModule { }

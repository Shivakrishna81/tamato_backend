import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AddAddressDto } from './dtos/addAddress.dto';
import { AbstractAddressService } from './address.abstract';

@ApiTags("Address")
@Controller('address')
export class AddressController {
    constructor(private readonly addressService:AbstractAddressService){}

    @ApiBearerAuth()
    @ApiOperation({summary:"creating user address"})
    @ApiBody({description:"user address details for orders",type:AddAddressDto})
    @UseGuards(JwtAuthGuard)
    @Post()
    async addAddress(@Body() details:any){
       return await this.addressService.addAddress(details)
    }
    

    @ApiBearerAuth() 
    @ApiOperation({summary:"Fetching user address"})
    @ApiParam({name:"userId"})
    @UseGuards(JwtAuthGuard)
    @Get(":userId")
    async getAddressByUserId(@Param("userId") userId:string){
        return await this.addressService.getAddressByUserId(userId)
    }
}

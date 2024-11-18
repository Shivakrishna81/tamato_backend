import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { AbstractOrderService } from './orders.abstract';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController{
    constructor(private readonly orderService:AbstractOrderService){} 

    @ApiBearerAuth()
    @ApiOperation({summary:"Creating an Order"})
    @ApiBody({description:"Details to add order"})
    @UseGuards(JwtAuthGuard)
    @Post()
    async addOrder(@Body('userId') userId:any){
        console.log("userIs",userId)
        return await this.orderService.addOrder(userId)
    }

    @ApiBearerAuth() 
    @ApiOperation({summary:"Fetching orders of specific user"})
    @ApiParam({name:"userId"}) 
    @UseGuards(JwtAuthGuard)
    @Get(":userId")
    async getOrdersByUserId(@Param("userId") userId:string){
        return await this.orderService.getOrdersByUserId(userId)
    }

    @ApiBearerAuth() 
    @ApiOperation({summary:"changing status, only for admin"})
    @ApiParam({name:"orderId"}) 
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @Put(':orderId')
    async updateOrderById(@Param('orderId') orderId:string, @Body() details:any){
        return await this.orderService.updateOrderById(orderId,details)
    }

    @ApiBearerAuth() 
    @ApiOperation({summary:"Fetching all order, only for admin"})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @Get()
    async getAllOrders(){
        return await this.orderService.getAllOrders()
    }
}

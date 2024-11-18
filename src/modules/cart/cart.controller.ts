import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AddCartItemDto } from './dtos/addCartItem.dto';
import { AbstractCartService } from './cart.abstract';

@ApiTags("Cart")
@Controller('cart')
export class CartController {
    constructor(private readonly cartService:AbstractCartService){} 

    @ApiBearerAuth()
    @ApiOperation({summary:'Adding an Item to cart'})
    @ApiBody({description:"Item details to add item",type:AddCartItemDto})
    @UseGuards(JwtAuthGuard)
    @Post() 
    async addItemToCart(@Body() details:any){
        return await this.cartService.addToCart(details)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Fetching all Cart Items"})
    @ApiParam({name:"userId"})
    @UseGuards(JwtAuthGuard)
    @Get(":userId") 
    async getALLCartItems(@Param('userId') userId:string){
        return await this.cartService.getUserCartItems(userId)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Deleting cart item by id"})
    @ApiParam({name:"id"})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteItemById(@Param('id') id:any){
        return this.cartService.deleteCartItemById(id)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Updating the cart item quantity"}) 
    @ApiBody({description:"Item details to add item"})
    @UseGuards(JwtAuthGuard) 
    @Put('update') 
    async updateCartQuantity(@Body() details:any){
        return this.cartService.updateQuantity(details)
    } 
}

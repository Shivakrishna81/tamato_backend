import { HttpStatus, Injectable } from '@nestjs/common';
import { AbstractCartDao } from 'src/database/mssql/abstract/cart.abstract';
import { CartDao } from 'src/database/mssql/dao/cart.dao';
import { messages } from 'src/shared/messages.shared';
import { ApiResponse, HandleResponse } from 'src/shared/responseHandler';
import { AbstractCartService } from './cart.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService implements AbstractCartService {

    private readonly cartDao:AbstractCartDao

    constructor(private readonly dbSvc: DatabaseService) { 
        this.cartDao=dbSvc.cartSqlTxn
    }

    async addToCart(itemDetails: any): Promise<ApiResponse> {
        return await this.cartDao.addCartItem(itemDetails)
    }

    async getUserCartItems(userId: any): Promise<ApiResponse> {
        try {
            const cartData = await this.cartDao.getUserCartItems(userId)
            const { data } = cartData
            let totalCartAmount=0
            const cartItems = data.map(item => {
                let menuItem = item.menuItem
                totalCartAmount+=menuItem.price * item.quantity
                return {
                    cartId: item.cartId,
                    userId: item.userId,
                    itemId: item.itemId,
                    quantity: item.quantity,
                    totalPrice: menuItem.price * item.quantity,
                    menuItem
                }
            })
           
            return HandleResponse(HttpStatus.OK,cartData.message,{totalCartAmount,cartItems})
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,err.message,)
        }
    }

    async deleteCartItemById(id: any): Promise<ApiResponse> {
        return await this.cartDao.deleteCartItem(id)
    }

    async updateQuantity(details: any): Promise<ApiResponse> {
        return await this.cartDao.updateCartItem(details)
    }
}

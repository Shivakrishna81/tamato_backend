import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderDao } from 'src/database/mssql/dao/order.dao';
import { CartService } from '../cart/cart.service';
import { ApiResponse, HandleResponse } from 'src/shared/responseHandler';
import { messages } from 'src/shared/messages.shared';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { OrderDto } from './dtos/order.dto';
import { AbstractOrderDao } from 'src/database/mssql/abstract/order.abstract';
import { AbstractOrderService } from './orders.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService implements AbstractOrderService {

    private readonly orderDao:AbstractOrderDao

    constructor(private readonly dbSvc:DatabaseService, private cartService: CartService) {
        this.orderDao=dbSvc.ordersSqlTxn
     }

    async addOrder(userId: any): Promise<any> {
        try {
            let { data } = await this.cartService.getUserCartItems(userId)
            return await this.orderDao.addOrder(userId, data, data.totalCartAmount)
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.OEC, err.message)
        }
    }

    async getOrdersByUserId(userId: string): Promise<ApiResponse> {
        return await this.orderDao.getOrdersByUserId(userId)
    }

    async updateOrderById(orderId: any,details:UpdateOrderDto): Promise<ApiResponse> {
        return await this.orderDao.updateOrder(orderId,details)
    }

    async getAllOrders():Promise<ApiResponse>{
        return await this.orderDao.getAllOrders()
    }
}

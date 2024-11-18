import { HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "../models/orders.model";
import { OrderItem } from "../models/orderItem.model";
import { Sequelize } from "sequelize-typescript";
import { ApiResponse, HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { Transaction } from "sequelize";
import { MenuItem } from "../models/menu.model";
import { http } from "winston";
import { Cart } from "../models/cart.model";
import { User } from "../models/user.model";
import { AbstractOrderDao } from "../abstract/order.abstract";


@Injectable()
export class OrderDao implements AbstractOrderDao {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order,
        @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
        @InjectModel(Cart) private cartModel:typeof Cart,
        private readonly sequelize: Sequelize
    ) { }

    async addOrder(userId: any, items: any,totalCartAmount:any): Promise<ApiResponse> {

        const transaction: Transaction = await this.sequelize.transaction();

        try {
            const order = await this.orderModel.create(
                { userId,totalAmount:totalCartAmount }, { transaction }
            )

            const orderItems = items.cartItems.map((item: any) => ({
                orderId: order.orderId,
                itemId: item.itemId,
                quantity: item.quantity,
                price: item.totalPrice
            }))

            console.log("orderItems", orderItems)
            await this.orderItemModel.bulkCreate(orderItems, { transaction });
            await this.cartModel.destroy({
                where:{userId},transaction
            })
            await transaction.commit()

            return HandleResponse(HttpStatus.CREATED,messages.OCS, order);
        } catch (err) {
            await transaction.rollback()
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.OEC, err.message)
        }
    }

    async getOrdersByUserId(userId: string): Promise<ApiResponse> {
        try {
          
            const orders = await Order.findAll({
              where: { userId },  
              include: [
                {
                  model: OrderItem,
                  include: [
                    {
                      model: MenuItem, 
                      attributes: ['name', 'price', 'category', 'imageUrl'] 
                    }
                  ],
                  attributes: ['quantity', 'price']
                }
              ],
              order: [['orderDate', 'DESC']] 
            });
        
            return HandleResponse(HttpStatus.OK,messages.OFS,orders);
        
          } catch (err) {
           return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.OEF,err.message)
          }
    }

    async getAllOrders(): Promise<ApiResponse> {
        try {
            const orders = await this.orderModel.findAll({
                include: [{
                    model: OrderItem,
                    include: [
                        {
                            model: MenuItem,
                            attributes: ['name', 'price', 'category', 'imageUrl']  
                        }
                    ],
                    attributes: ['quantity', 'price']  
                },
                {
                    model: User,
                    attributes: ['username', 'userId', 'email']  
                }],
                order: [['orderDate', 'DESC']]
            });
    
            return HandleResponse(HttpStatus.OK, messages.OFS, orders);
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.OEF, err.message);
        }
    }
    

    async getOrderById(orderId: string): Promise<ApiResponse> {
        try {
            const order = await this.orderModel.findAll({
                where: { id: orderId },
                include: [{
                    model: OrderItem,
                    include: [{
                        model: MenuItem
                    }]
                }]
            })

            if (!order) {
                throw new NotFoundException('Order not found')
            }

            return HandleResponse(HttpStatus.OK, messages.OFS, order)
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.OEF, err.message)
        }
    }

    async updateOrder(orderId: string,details:any): Promise<ApiResponse> {
        try {
            await this.orderModel.update(details, { where: { orderId }, returning: true });
            return HandleResponse(HttpStatus.OK, messages.OUS)
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.OEU, err.message)
        }
    }
}
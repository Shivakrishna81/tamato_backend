import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractOrderDao {
    abstract addOrder(userId: any, items: any, totalCartAmount: any): Promise<ApiResponse>
    abstract getOrdersByUserId(userId: string): Promise<ApiResponse>
    abstract getAllOrders(): Promise<ApiResponse>
    abstract getOrderById(orderId: string): Promise<ApiResponse>
    abstract updateOrder(orderId: string, details: any): Promise<ApiResponse>

}
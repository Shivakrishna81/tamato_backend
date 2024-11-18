import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractOrderService{
    abstract addOrder(userId: any): Promise<ApiResponse>
    abstract getOrdersByUserId(userId: string): Promise<ApiResponse>
    abstract getAllOrders(): Promise<ApiResponse>
    abstract updateOrderById(orderId: string, details: any): Promise<ApiResponse>
}
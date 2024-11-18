import { ApiResponse } from "src/shared/responseHandler"

export abstract class AbstractCartService{
    abstract addToCart(itemDetails: any): Promise<ApiResponse>
    abstract getUserCartItems(userId: any): Promise<ApiResponse>
    abstract deleteCartItemById(id: any): Promise<ApiResponse>
    abstract updateQuantity(details: any): Promise<ApiResponse>
}
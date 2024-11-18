import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractCartDao{
    abstract addCartItem(details: any):Promise<ApiResponse>
    abstract updateCartItem(details: any):Promise<ApiResponse> 
    abstract getUserCartItems(id:string):Promise<ApiResponse>
    abstract deleteCartItem(cartId:string):Promise<ApiResponse>
}
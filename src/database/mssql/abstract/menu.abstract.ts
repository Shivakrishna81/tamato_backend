import { ApiResponse } from "src/shared/responseHandler"

export abstract class AbstractMenuDao {
    abstract addItem(itemDetails: any): Promise<ApiResponse>
    abstract getAllItemsByCategory(category: string): Promise<ApiResponse>
    abstract getAllItems(): Promise<ApiResponse>
    abstract deleteItemById(itemId: string): Promise<ApiResponse>
    abstract updateItemById(itemId: string, updateItemDetails: any): Promise<ApiResponse>
}
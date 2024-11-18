import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractCategoryService{
    abstract getAllCategories():Promise<ApiResponse>
    abstract addCategory(category:string): Promise<ApiResponse>
}
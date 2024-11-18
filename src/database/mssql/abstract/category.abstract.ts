import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractCategoryDao{
    abstract getAllCategories():Promise<ApiResponse>
    abstract addCategory(category:string): Promise<ApiResponse>
}
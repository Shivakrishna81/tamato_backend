import { ApiResponse } from "src/shared/responseHandler";


export abstract class AbstractAddressDao{
    abstract addAddress(details:any):Promise<ApiResponse>
    abstract getAddressByUserId(userId:string):Promise<ApiResponse>
}
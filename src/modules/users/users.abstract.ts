import { ApiResponse } from "src/shared/responseHandler";

export abstract class AbstractUserService {
    abstract createUser(userDetails: any): Promise<ApiResponse>
    abstract getAllUsers(): Promise<ApiResponse>
    abstract userLogin(userDetails: any): Promise<any>
    abstract getUserByMail(email: string): Promise<ApiResponse>
    abstract verifyUser(code: string): Promise<ApiResponse>
}
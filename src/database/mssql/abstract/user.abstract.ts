import { ApiResponse } from "src/shared/responseHandler";


export abstract class AbstractUserDao {
    abstract createUser(userDetails: any): Promise<ApiResponse>
    abstract getAllUsers(): Promise<ApiResponse>
    abstract userLogin(userDetails: any): Promise<ApiResponse>
    abstract getUserByMail(email: string): Promise<ApiResponse>
}
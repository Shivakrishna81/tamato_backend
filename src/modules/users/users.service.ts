import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDao } from 'src/database/mssql/dao/user.dao';
import { User } from 'src/database/mssql/models/user.model';
import { JwtAuthService } from './jwt-auth.service';
import { HandleResponse } from 'src/shared/responseHandler';

@Injectable()
export class UsersService {
    constructor(private readonly userDao:UserDao, private jwtAuthService:JwtAuthService){}

    async createUser(userDetails:any):Promise<User>{
        return await this.userDao.createUser(userDetails)
    }

    async userLogin(details:any){
        console.log(details)
        const user=await this.userDao.userLogin(details) 
        if(user.status!==200){
            return HandleResponse(HttpStatus.BAD_REQUEST,user.message)
        }
         const token= await this.jwtAuthService.genereteJwt(user.data) 
        return {token,...user}
    }

    async getUserByMail(email:string):Promise<any>{
        return await this.userDao.getUserByMail(email)  
    }

    async getAllUsers(){
        return await this.userDao.getAllUsers()
    }
}

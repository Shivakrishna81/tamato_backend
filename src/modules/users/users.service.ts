import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDao } from 'src/database/mssql/dao/user.dao';
import { User } from 'src/database/mssql/models/user.model';
import { JwtAuthService } from './jwt-auth.service';
import { ApiResponse, HandleResponse } from 'src/shared/responseHandler';
import { messages } from 'src/shared/messages.shared';
import { ConfigService } from '@nestjs/config';
import axios  from 'axios'
import { UserDto } from './dtos/user.dto';
import { AbstractUserDao } from 'src/database/mssql/abstract/user.abstract';
import { AbstractUserService } from './users.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService implements AbstractUserService{

    private readonly userDao: AbstractUserDao

    constructor(private readonly dbSvc:DatabaseService, private jwtAuthService: JwtAuthService,private configService:ConfigService) { 
        this.userDao=dbSvc.userSqlTxn
    }

    async createUser(userDetails: any): Promise<any> {
        return await this.userDao.createUser(userDetails)
    }

    async verifyUser(code: any): Promise<any> {
       
        try {
            const tenantId = this.configService.get("TENANT_ID")
            const client_id = this.configService.get("CLIENT_ID")
            const redirect_uri = this.configService.get("REDIRECT_URI")
            const client_secret = this.configService.get("CLIENT_SECRET")

            const tokenResponse = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
                new URLSearchParams({
                    client_id,
                    client_secret,
                    code,
                    redirect_uri,
                    grant_type: 'authorization_code',
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })

                let userDetails = await this.getUserDetails(tokenResponse.data.access_token)
                console.log("user details", userDetails)
            
                let userWithRole=await this.userDao.getUserByMail(userDetails.mail)
                console.log("userWithRole",userWithRole)

                const customDetails={
                    userId:userWithRole.data.userId,
                    username:userDetails.displayName,
                    email:userDetails.mail,
                    role:userWithRole.data.role
                }

                console.log("customDetails",customDetails)

                let token=await this.jwtAuthService.genereteJwt(customDetails)
                return HandleResponse(HttpStatus.OK,messages.UF,{token,...customDetails})
        }
        catch (err) {
            HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.UEL, err.message)
        }
    }

    async getUserDetails(accessToken: string){
        try{
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
     
          const response = await axios.get("https://graph.microsoft.com/v1.0/me", {headers});
          return response.data
     
        }catch(e){
            return e
        }
      }


    async userLogin(details: any): Promise<any> {
        console.log(details)
        try {
            const user = await this.userDao.userLogin(details)
            const token = await this.jwtAuthService.genereteJwt(user.data)
            return { token, ...user }
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.UEL,err.message)
        }
    }

    async getUserByMail(email: string): Promise<ApiResponse> {
        return await this.userDao.getUserByMail(email)
    }

    async getAllUsers(): Promise<ApiResponse> {
        return await this.userDao.getAllUsers()
    } 

}
 
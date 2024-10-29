import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {

    constructor(private jwtService:JwtService){}

    async genereteJwt(user:any){
        const payload={email:user.email,role:user.role,userId:user.userId}
        return await this.jwtService.sign(payload);
    }

    async verifyToken(token:string){
        const payload=await this.jwtService.verify(token) 
        return payload 
    }
}

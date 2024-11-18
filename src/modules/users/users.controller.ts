import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { CreateUserDto } from './dtos/createUserDto';
import { LoginUserDto } from './dtos/loginUserDto';
import { AbstractUserService } from './users.abstract';

@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly userService:AbstractUserService){}

    @ApiBearerAuth()
    @ApiOperation({summary:'Create an user'})
    @ApiBody({
        description:"User Data for creating user!",type:CreateUserDto
    })
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @Post('register') 
    async create(@Body() body:CreateUserDto){
        console.log("bodyyyyyyy",body)
        return this.userService.createUser(body)
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"Fetching all users(Admin role)"})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles("admin")
    @Get() 
    async getAllUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary:"User Login"})
    @ApiBody({
        description:"User Data for Login!", type:LoginUserDto
    })
    @Post('callback')
    async verifyUser(@Body('code') code:any){
        return this.userService.verifyUser(code)
    }

    @ApiOperation({summary:'Checking user exists!'})
    @ApiBody({
        description:"Method to check if user existed or not",type:CreateUserDto
    })
    @Post('exist')
    async userExist(@Body('email') email:string){
        return this.userService.getUserByMail(email)
    }
    
    @ApiOperation({summary:'Admin login'})
    @ApiBody({
        description:"Only for admin login!",type:LoginUserDto
    })
    @Post('login')
    async userLogin(@Body() details:any){
        return this.userService.userLogin(details)
    }
}

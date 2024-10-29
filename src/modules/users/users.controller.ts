import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { CreateUserDto } from './dtos/createUserDto';
import { LoginUserDto } from './dtos/loginUserDto';

@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

   
    @ApiOperation({summary:'Create an user'})
    @ApiBody({
        description:"User Data for creating user!",type:CreateUserDto
    })
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

    @ApiOperation({summary:"Getting user by email."})
    @ApiQuery({ name: 'email', required: true, type: String, description: 'Email of the user' })
    @Get('email')
    async getUserByMail(@Query("email") email:any){
        return this.userService.getUserByMail(email)
    }

    @ApiOperation({summary:"User Login"})
    @ApiBody({
        description:"User Data for Login!", type:LoginUserDto
    })
    @Post('login')
    async Login(@Body() details:any){
        return this.userService.userLogin(details)
    }
    
}

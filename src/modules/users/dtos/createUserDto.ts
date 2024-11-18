import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty() 
    email:string  
}
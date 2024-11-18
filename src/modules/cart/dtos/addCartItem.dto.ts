import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class AddCartItemDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    itemId:string

    @ApiProperty()
    @IsNotEmpty()
    quantity:number
}
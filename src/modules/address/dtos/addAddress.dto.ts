import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AddAddressDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    village:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state:string

    @ApiProperty()
    @IsNotEmpty()
    @Type(()=>Number)
    pincode:number 

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    landmark:string
}
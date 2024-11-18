import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category:string
}
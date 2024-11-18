import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsBoolean()
    availability: boolean;

    @ApiProperty()
    @IsOptional()
    @IsDecimal()
    averageRating?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    totalReviews?: number;
}

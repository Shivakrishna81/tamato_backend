// src/dtos/menu/update-menu-item.dto.ts

import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMenuItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}

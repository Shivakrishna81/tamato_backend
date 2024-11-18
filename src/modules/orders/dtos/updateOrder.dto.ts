import { IsUUID, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsString()
  @IsOptional()
  status?: string;
}

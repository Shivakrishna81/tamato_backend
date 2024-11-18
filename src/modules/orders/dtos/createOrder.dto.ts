
import { IsUUID, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  status?: string;
}

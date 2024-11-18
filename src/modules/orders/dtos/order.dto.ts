import { OrderItemDto } from "./orderitem.dto";

export class OrderDto {
    orderId: string;
    userId: string;
    totalAmount: number;
    orderDate: Date;
    status: string;
    items: OrderItemDto[];
  }
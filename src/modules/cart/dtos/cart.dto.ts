import { MenuItemDto } from "src/modules/menus/dtos/menuitemDto";

export class CartDto {
    cartId: string;
    userId: string;
    itemId: string;
    quantity: number;
    menuItem: MenuItemDto; 
  }
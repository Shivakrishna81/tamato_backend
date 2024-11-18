import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./orders.model";
import { MenuItem } from "./menu.model";

@Table({
    tableName:'order_items'
})
export class OrderItem extends Model<OrderItem>{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        defaultValue:DataType.UUIDV4 
    })
    id:string; 

    @ForeignKey(()=>Order)
    @Column({
        type:DataType.UUID,
        allowNull:false,
    })
    orderId:string 

    @BelongsTo(()=>Order)
    order:Order 

    @ForeignKey(()=>MenuItem)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    itemId:string

    @BelongsTo(()=>MenuItem)
    menuItem:MenuItem  

    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    quantity:number 

    @Column({
        type:DataType.FLOAT,
        allowNull:false 
    })
    price:number
}
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./user.model";
import { OrderItem } from "./orderItem.model";


@Table({
    tableName: "orders"
})
export class Order extends Model<Order> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    orderId: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId: string

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
      })
      totalAmount: number; 

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    orderDate: Date;

    @Column({
        defaultValue: 'pending',
        allowNull: false,
    })
    status: string;

    @HasMany(()=>OrderItem,{onDelete:"CASCADE"})
    items:OrderItem[]
}
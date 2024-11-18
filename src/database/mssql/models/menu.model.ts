import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { Review } from "./review.model";
import { Cart } from "./cart.model";
import { OrderItem } from "./orderItem.model";


@Table({
    tableName: "menus"
})
export class MenuItem extends Model<MenuItem> {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true,
    }) 
    itemId: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column
    category: string;

    @Column
    type: string;

    @Column
    imageUrl: string;

    @Column
    availability: boolean;

    @Column({
        type: DataType.DECIMAL(3, 2),
        defaultValue: 0,
    })
    averageRating: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    totalReviews: number;

    @HasMany(() => Review, {
        onDelete: 'CASCADE', 
        hooks: true,
    })
    reviews: Review[];

    @HasMany(() => Cart, {
        onDelete: 'CASCADE',  
        hooks: true,
    })
    carts: Cart[];

    @HasMany(() => OrderItem, {
        onDelete: 'CASCADE',  
        hooks: true,
    })
    orderItems:OrderItem[]
}

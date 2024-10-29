import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import {v4 as uuidv4} from 'uuid'
import { Review } from "./review.model";

@Table({
    tableName:"menus"
})
export class MenuItem extends Model<MenuItem>{
    @Column({
        type:DataType.UUID,
        defaultValue:uuidv4,
        allowNull:false,
        primaryKey:true,
    })
    itemId:string 

    @Column
    name:string 

    @Column
     description:string 

    @Column
    price:number

    @Column
    category:string 

    @Column 
    type:string 

    @Column
    imageUrl:string 

    @Column 
    availability:boolean

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

    @HasMany(() => Review)
    reviews: Review[];
}
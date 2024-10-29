import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {v4 as uuidv4} from 'uuid'
import { MenuItem } from "./menu.model";
import { User } from "./user.model";

@Table({tableName:'cart'})
export class Cart extends Model<Cart>{
    @Column({
        type:DataType.UUID,
        defaultValue:uuidv4,
        allowNull:false 
    })
    cartId:string

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUID,
    })
    userId:String 

    @ForeignKey(()=>MenuItem)
    @Column({
        type:DataType.UUID
    })
    itemId:string 

    @Column({
        type:DataType.INTEGER,
        defaultValue:1
    })
    quantity:number

    @BelongsTo(()=>User)
    user:User

    @BelongsTo(()=>MenuItem)
    menuItem: MenuItem
}
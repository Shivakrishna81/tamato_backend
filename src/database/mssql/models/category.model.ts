import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from "./menu.model";

@Table({
    tableName:"categories"
})
export class Category extends Model<Category>{
    @Column({
        type:DataType.UUID,
        defaultValue:uuidv4,
        allowNull:false,
        primaryKey:true 
    })
    categoryId:string ;

    @Column
    category:string

   

}
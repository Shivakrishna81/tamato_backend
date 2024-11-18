import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";


@Table({tableName:"address"})
export class Address extends Model<Address>{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        defaultValue:DataType.UUIDV4
    })
    id:string 

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUID,
        allowNull:false 
    })
    userId:string 

    @BelongsTo(()=>User) 
    user:User;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    village:string 

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      state: string;
    
      @Column({
        type: DataType.INTEGER, 
        allowNull: false,
      })
      pincode: number;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      phoneNumber: string; 
    
      @Column({
        type: DataType.STRING,
      })
      landmark: string; 
}
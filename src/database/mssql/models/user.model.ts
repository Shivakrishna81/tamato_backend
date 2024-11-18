import { Column, Model, Table, HasMany, DataType, PrimaryKey } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: 'users'
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true,
    })
    userId: string;

    @Column({
        allowNull: true
    })
    username: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        defaultValue: "user"
    })
    role: string

    @Column({
        allowNull: true
    })
    password: string
}
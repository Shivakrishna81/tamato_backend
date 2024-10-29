import { Column, DataType, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

import { User } from './user.model';
import { MenuItem } from "./menu.model";

@Table({ tableName: "reviews" })
export class Review extends Model<Review> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        allowNull: false,
    })
    reviewId: string;

    @ForeignKey(() => MenuItem)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    itemId: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    })
    rating: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    comment: string;

    @BelongsTo(() => MenuItem)
    menuItem: MenuItem;

    @BelongsTo(() => User)
    user: User;
}
import { Module } from '@nestjs/common';
import { DatabaseConnection } from './mssql/connection/connection';
import { DatabaseService } from './database.service';
import { UserDao } from './mssql/dao/user.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './mssql/models/user.model';
import { JwtAuthService } from 'src/modules/users/jwt-auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { AppConfigService } from 'src/config/appconfig.service';
import { ConfigModule } from '@nestjs/config';
import { MenuDao } from './mssql/dao/menu.dao';
import { MenuItem } from './mssql/models/menu.model';
import { Review } from './mssql/models/review.model';
import { Cart } from './mssql/models/cart.model';
import { CartDao } from './mssql/dao/cart.dao';
import { Category } from './mssql/models/category.model';
import { CategoryDao } from './mssql/dao/category.dao';
import { Order } from './mssql/models/orders.model';
import { OrderItem } from './mssql/models/orderItem.model';
import { OrderDao } from './mssql/dao/order.dao';
import { Address } from './mssql/models/address.model';
import { AddressDao } from './mssql/dao/address.dao';
import { AbstractCategoryDao } from './mssql/abstract/category.abstract';
import { AbstractAddressDao } from './mssql/abstract/address.abstract';
import { AbstractCartDao } from './mssql/abstract/cart.abstract';
import { AbstractUserDao } from './mssql/abstract/user.abstract';
import { AbstractMenuDao } from './mssql/abstract/menu.abstract';
import { AbstractOrderDao } from './mssql/abstract/order.abstract';


@Module({
    imports: [DatabaseConnection,SequelizeModule.forFeature([User, MenuItem, Review, Cart, Category, Order, OrderItem, Address]), DatabaseModule],
    exports: [DatabaseService,
        {
            provide: AbstractCategoryDao,
            useClass: CategoryDao,
        },
        {
            provide: AbstractAddressDao,
            useClass: AddressDao,
        }, {
            provide: AbstractCartDao,
            useClass: CartDao,
        }, {
            provide: AbstractUserDao,
            useClass: UserDao,
        }, {
            provide: AbstractMenuDao,
            useClass: MenuDao,
        },
        {
            provide: AbstractOrderDao,
            useClass: OrderDao,
        },],
    providers: [DatabaseService, 
        {
            provide: AbstractCategoryDao,
            useClass: CategoryDao,
        },
        {
            provide: AbstractAddressDao,
            useClass: AddressDao,
        }, {
            provide: AbstractCartDao,
            useClass: CartDao,
        }, {
            provide: AbstractUserDao,
            useClass: UserDao,
        }, {
            provide: AbstractMenuDao,
            useClass: MenuDao,
        },
        {
            provide: AbstractOrderDao,
            useClass: OrderDao,
        },]
})
export class DatabaseModule { }

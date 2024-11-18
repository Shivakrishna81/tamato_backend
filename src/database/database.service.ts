import { Injectable } from '@nestjs/common';
import { AbstractUserDao } from './mssql/abstract/user.abstract';
import { AbstractMenuDao } from './mssql/abstract/menu.abstract';
import { AbstractOrderDao } from './mssql/abstract/order.abstract';
import { AbstractCartDao } from './mssql/abstract/cart.abstract';
import { AbstractAddressDao } from './mssql/abstract/address.abstract';
import { AbstractCategoryDao } from './mssql/abstract/category.abstract';

@Injectable()
export class DatabaseService {
    constructor(
        public userSqlTxn:AbstractUserDao,
        public menuSqlTxn:AbstractMenuDao,
        public ordersSqlTxn:AbstractOrderDao,
        public cartSqlTxn:AbstractCartDao,
        public addressSqlTxn:AbstractAddressDao,
        public categorySqlTxn:AbstractCategoryDao
    ){}
}
 
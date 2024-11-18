import { Injectable } from '@nestjs/common';
import { MenuDao } from 'src/database/mssql/dao/menu.dao';
import { JwtAuthService } from '../users/jwt-auth.service';
import { MenuItemDto } from './dtos/menuitemDto';
import { UpdateMenuItemDto } from './dtos/updatemenuItemDto';
import { ApiResponse } from 'src/shared/responseHandler';
import { AbstractMenuDao } from 'src/database/mssql/abstract/menu.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MenusService {

    private readonly menuDao:AbstractMenuDao

    constructor(private readonly dbSvc:DatabaseService){
        this.menuDao=dbSvc.menuSqlTxn
    }

    async addItem(itemDetails:any): Promise<ApiResponse>{
        return await this.menuDao.addItem(itemDetails)
    }

    async getAllItemsByCategory(categoryId:string): Promise<ApiResponse>{
        return await this.menuDao.getAllItemsByCategory(categoryId)
    }

    async getAllItems():Promise<ApiResponse>{
        return await this.menuDao.getAllItems()
    }

    async deleteItemById(id:any): Promise<ApiResponse>{
        return await this.menuDao.deleteItemById(id)
    }

    async updateItemById(itemId:string,updateDetails:UpdateMenuItemDto): Promise<ApiResponse>{
        return await this.menuDao.updateItemById(itemId,updateDetails)
    }
}

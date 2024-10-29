import { Injectable } from '@nestjs/common';
import { MenuDao } from 'src/database/mssql/dao/menu.dao';
import { JwtAuthService } from '../users/jwt-auth.service';

@Injectable()
export class MenusService {
    constructor(private readonly menuDao:MenuDao){}

    async addItem(itemDetails:any){
        return await this.menuDao.addItem(itemDetails)
    }

    async getAllItems(){
        return await this.menuDao.getAllItems()
    }

    async deleteItemById(id:any){
        return await this.menuDao.deleteItemById(id)
    }
}

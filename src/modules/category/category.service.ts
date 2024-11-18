import { Injectable } from '@nestjs/common';
import { AbstractCategoryDao } from 'src/database/mssql/abstract/category.abstract';
import { CategoryDao } from 'src/database/mssql/dao/category.dao';
import { AbstractCategoryService } from './category.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService implements AbstractCategoryService{

    private readonly categoryDao:AbstractCategoryDao

    constructor(private readonly dbSvc:DatabaseService){
        this.categoryDao=dbSvc.categorySqlTxn
    } 

    async addCategory(category:string): Promise<any>{
        return await this.categoryDao.addCategory(category)
    }

    async getAllCategories(): Promise<any>{
        return await this.categoryDao.getAllCategories()
    }

}

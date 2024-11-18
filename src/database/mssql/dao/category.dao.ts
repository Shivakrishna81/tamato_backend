import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "../models/category.model";
import { HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { AbstractCategoryDao } from "../abstract/category.abstract";

@Injectable() 
export class CategoryDao implements AbstractCategoryDao{
    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category){}

    async getAllCategories(){
        try{
            let categories=await this.categoryModel.findAll()
            return HandleResponse(HttpStatus.OK,messages.CAFS,categories)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CAEF,err.mesage)
        }
    }

    async addCategory(category:string){
        try{
            await this.categoryModel.create(category)
            return HandleResponse(HttpStatus.CREATED,messages.CACS)
        }catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CAEC,err.message)
        }
    }
} 
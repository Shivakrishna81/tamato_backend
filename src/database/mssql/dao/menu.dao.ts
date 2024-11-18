import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MenuItem } from "../models/menu.model";
import { ApiResponse, HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { Category } from "../models/category.model";
import { AbstractMenuDao } from "../abstract/menu.abstract";


@Injectable()
export class MenuDao implements AbstractMenuDao{
    constructor(@InjectModel(MenuItem) private readonly menuModel:typeof MenuItem){}

    async addItem(itemDetails:any): Promise<ApiResponse>{
        try{
            await this.menuModel.create(itemDetails)
            return HandleResponse(HttpStatus.CREATED,messages.IC)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEC,err.message)
        }
    }

    async getAllItemsByCategory(category:string):Promise<ApiResponse>{
        try{
            let Items=await this.menuModel.findAll({
                where:{category},
            })
            return HandleResponse(HttpStatus.OK,messages.IF1,Items)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEF,err.message)
        }
    }

    async getAllItems():Promise<ApiResponse>{
        try{
            let Items=await this.menuModel.findAll()
            return HandleResponse(HttpStatus.OK,messages.IF1,Items)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEF,err.message)
        }
    }


    async deleteItemById(itemId:any): Promise<ApiResponse>{
        try{
            const deletedCount=await this.menuModel.destroy({where:{itemId}})
            if(deletedCount===0){
                return HandleResponse(HttpStatus.NOT_FOUND,messages.IENF)
            }
            return HandleResponse(HttpStatus.OK,messages.ID)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IED,err.message)
        }
    }

    async updateItemById(itemId:string,updateItemDetails:any):Promise<ApiResponse>{
        try{
            let item=await this.menuModel.findOne({where:{itemId}})
            if(!item){
                return HandleResponse(HttpStatus.NOT_FOUND,messages.IENF)
            }

            const updatedItem=await item.update(updateItemDetails)
            return HandleResponse(HttpStatus.OK,messages.IU,updatedItem)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEU)
        }
    }
}
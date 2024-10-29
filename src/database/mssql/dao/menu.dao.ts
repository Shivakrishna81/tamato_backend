import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MenuItem } from "../models/menu.model";
import { HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";


@Injectable()
export class MenuDao{
    constructor(@InjectModel(MenuItem) private readonly menuModel:typeof MenuItem){}

    async addItem(itemDetails:any){
        try{
            await this.menuModel.create(itemDetails)
            return HandleResponse(HttpStatus.CREATED,messages.IC)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEC,err.message)
        }
    }

    async getAllItems():Promise<MenuItem[]>{
        try{
            let Items=await this.menuModel.findAll()
            return HandleResponse(HttpStatus.OK,messages.IF1,Items)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IEF,err.message)
        }
    }

    async deleteItemById(itemId:any){
        try{
            await this.menuModel.destroy({where:{itemId}})
            return HandleResponse(HttpStatus.OK,messages.ID)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.IED,err.message)
        }
    }
}
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cart } from "../models/cart.model";
import { HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { MenuItem } from "../models/menu.model";


@Injectable()
export class CartDao{
    constructor(@InjectModel(Cart) private readonly cartModel: typeof Cart){}


    async addCartItem(details:any){
        try{
            const {userId,itemId}=details
            const existingItem=await this.cartModel.findOne({where:{userId,itemId}})
            if(existingItem){
                existingItem.quantity+=details.quantity
                await existingItem.save()
                return HandleResponse(HttpStatus.OK,messages.CIE,existingItem)
            }

            let data=await this.cartModel.create(details) 
            return HandleResponse(HttpStatus.CREATED,messages.CIC,data)
        }
        catch(err){
            HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CEA,err.message)
        }
    }

    async getUserCartItems(id:string){
        try{
            let data=await this.cartModel.findAll({where:{userId:id},include:[
                {
                    model:MenuItem,
                    as:'items'
                }
            ]})

            return HandleResponse(HttpStatus.OK,messages.CIF,data)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CIEF,err.message)
        }
    }

    async deleteCartItem(itemId:string){
        try{
            let response=await this.cartModel.destroy({where:{itemId}})
            if(response===0){
                return HandleResponse(HttpStatus.NOT_FOUND,messages.IENF)
            }
            return HandleResponse(HttpStatus.OK,messages.ID)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CIED,err.message)
        }
    }
}
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cart } from "../models/cart.model";
import { HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { MenuItem } from "../models/menu.model";
import { AbstractCartDao } from "../abstract/cart.abstract";


@Injectable()
export class CartDao implements AbstractCartDao{
    constructor(@InjectModel(Cart) private readonly cartModel: typeof Cart){}


   
    async addCartItem(details: any) {
        try {
            const { userId, itemId, quantity } = details;
            console.log(userId, itemId);
    
            const existingItem = await this.cartModel.findOne({ where: { userId, itemId } });
            if (existingItem) {
                existingItem.quantity += quantity; 
                await existingItem.save();
                return HandleResponse(HttpStatus.OK, messages.CIE, existingItem);
            }
    
            let data = await this.cartModel.create(details);
            return HandleResponse(HttpStatus.CREATED, messages.CIC, data);
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.CEA, err.message); 
        }
    }
    
    async updateCartItem(details: any) {
        try {
            const {userId,itemId,quantity} = details;
            console.log(userId,itemId);
    
            const existingItem = await this.cartModel.findOne({where:{userId,itemId}});
            if (!existingItem) {
                return HandleResponse(HttpStatus.NOT_FOUND, messages.IENF);
            }
    
            existingItem.quantity=quantity;
    
            if (existingItem.quantity <= 0) {
                await this.cartModel.destroy({where:{userId,itemId}});
                return HandleResponse(HttpStatus.OK, messages.CIQD);
            } else {
                await existingItem.save();
                return HandleResponse(HttpStatus.OK,messages.CIQU,existingItem);
            }
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CIEQU,err.message);
        }
    }
    

    async getUserCartItems(id:string){
        try{
            let data=await this.cartModel.findAll({where:{userId:id},include:[
                {
                    model:MenuItem,
                    as:'menuItem'
                }
            ]})


            return HandleResponse(HttpStatus.OK,messages.CIF,data)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.CIEF,err.message)
        }
    }

    async deleteCartItem(cartId:string){
        try{
            let response=await this.cartModel.destroy({where:{cartId}})
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
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "../models/address.model";
import { ApiResponse, HandleResponse } from "src/shared/responseHandler";
import { HttpStatus } from "@nestjs/common";
import { messages } from "src/shared/messages.shared";
import { AbstractAddressDao } from "../abstract/address.abstract";


export class AddressDao implements AbstractAddressDao{
    constructor(@InjectModel(Address) private addressModel: typeof Address){}

    async addAddress(details:any):Promise<ApiResponse>{
        try{
            await this.addressModel.create(details)
            return HandleResponse(HttpStatus.CREATED,messages.ACS)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.AEC,err.message)
        }
    }

    async getAddressByUserId(userId:string):Promise<ApiResponse>{
        try{
           
            let userAddress=await this.addressModel.findAll({where:{userId}}) 
            return HandleResponse(HttpStatus.OK,messages.AFS,userAddress)
        }
        catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR,messages.AEF,err.message)
        }
    }
}
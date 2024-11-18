import { HttpStatus, Injectable } from '@nestjs/common';
import { AbstractAddressDao } from 'src/database/mssql/abstract/address.abstract';
import { AddressDao } from 'src/database/mssql/dao/address.dao';
import { messages } from 'src/shared/messages.shared';
import { ApiResponse, HandleResponse } from 'src/shared/responseHandler';
import { AbstractAddressService } from './address.abstract';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddressService implements AbstractAddressService {
    
    private readonly addressDao: AbstractAddressDao

    constructor(readonly dbSvc:DatabaseService){
        this.addressDao=dbSvc.addressSqlTxn
    } 

    async addAddress(details:any): Promise<ApiResponse>{
       
        try{
            const {pincode}=details
            const updatedDetails={
                ...details,
                pincode:Number(pincode),
            }
            return await this.addressDao.addAddress(updatedDetails) 
        }catch(err){
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.AEC,err.message)
        }
    }

    async getAddressByUserId(userId:string): Promise<ApiResponse>{
        return await this.addressDao.getAddressByUserId(userId)
    }
}

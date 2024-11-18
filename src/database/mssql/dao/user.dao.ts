import { HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { ApiResponse, HandleResponse } from "src/shared/responseHandler";
import { messages } from "src/shared/messages.shared";
import { ValidationError, where } from "sequelize";
import * as bcrypt from 'bcrypt';
import { use } from "passport";
import { AbstractUserDao } from "../abstract/user.abstract";





@Injectable()
export class UserDao implements AbstractUserDao{
    constructor(@InjectModel(User) private readonly userModel: typeof User) { }


    async createUser(userDetails: any): Promise<ApiResponse> {
        try {
            if (userDetails.password) {
                const hasedPassword = await bcrypt.hash(userDetails.password, 10)
                const newUser = { ...userDetails, password: hasedPassword }
                await this.userModel.create(newUser)
                return HandleResponse(HttpStatus.CREATED, messages.UC)
            }
            await this.userModel.create(userDetails)
            return HandleResponse(HttpStatus.CREATED, messages.UC)
        }
        catch (err) {
            if (err instanceof ValidationError) {
                return HandleResponse(HttpStatus.CONFLICT, messages.UEE)
            }
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.ISE, err.message)
        }
    }

    async getUserByMail(email: string): Promise<ApiResponse> {
        try {
            const userData = await this.userModel.findOne({ where: { email } })
            if (!userData) {
                return HandleResponse(HttpStatus.BAD_REQUEST, messages.UENF)
            }
            return HandleResponse(HttpStatus.OK, messages.UF1, userData)
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.UFF,)
        }
    }

    async getAllUsers(): Promise<ApiResponse> {
        try {
            let data = await this.userModel.findAll({ where: { role: 'user' } });
            if (!data) {
                return HandleResponse(HttpStatus.BAD_REQUEST, messages.UENF)
            }
            return HandleResponse(HttpStatus.OK, messages.UF1, data)
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.UFF)
        }
    }

    async userLogin(userDetails: any): Promise<ApiResponse> {
        try {
            const { email, password } = userDetails
            const existedUser = await this.userModel.findOne({ where: { email } })
            if (!existedUser) {
                return HandleResponse(HttpStatus.NOT_FOUND, messages.UENF)

            }
            const validPassword = await bcrypt.compare(password, existedUser.password);
            if (!validPassword) {
                return HandleResponse(HttpStatus.BAD_REQUEST, messages.UIP)
            }
            console.log("daooooo", validPassword)
            return HandleResponse(HttpStatus.OK, messages.UF, existedUser)
        }
        catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.UEL, err.message)

        }

    }

    async updateUser(userId: string, details: any): Promise<any> {
        try {
            await this.userModel.update(details, { where: { userId } })
            return HandleResponse(HttpStatus.OK, messages.UC)
        } catch (err) {
            return HandleResponse(HttpStatus.INTERNAL_SERVER_ERROR, messages.UC, err.message)
        }
    }
}


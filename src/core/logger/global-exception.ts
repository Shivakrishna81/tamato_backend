import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AppLogger } from "./logger";
import { timestamp } from "rxjs";
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';


@Catch() 
export class GlobalExceptionFilter implements ExceptionFilter{
    constructor(private readonly appLogger:AppLogger){} 

    catch(exception:unknown,host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const response=ctx.getResponse<ExpressResponse>();
        const request=ctx.getRequest<Request>();
        
        const status=exception instanceof HttpException
        ?exception.getStatus()
        :HttpStatus.INTERNAL_SERVER_ERROR

        const message=exception instanceof HttpException
        ?exception.message
        :'Internal server error'

        const errorResponse={
            status,
            message
        };

        this.appLogger.logError(message, status, {
            path: request.url,
            method:request.method,
            body:request.body
        })
        response.status(status).json(errorResponse);
    }
}
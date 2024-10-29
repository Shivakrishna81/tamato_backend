import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AppLogger } from "./logger";
import { timestamp } from "rxjs";



@Catch() 
export class GlobalExceptionFilter implements ExceptionFilter{
    constructor(private readonly appLogger:AppLogger){} 

    catch(exception:unknown,host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const response=ctx.getResponse<Response>();
        const request=ctx.getRequest<Request>();
        
        const status=exception instanceof HttpException
        ?exception.getStatus()
        :HttpStatus.INTERNAL_SERVER_ERROR

        const message=exception instanceof HttpException
        ?exception.message
        :'Internal server error'

        const errorResponse={
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method:request.method 
        };

        this.appLogger.logError(message, status, {
            path: request.url,
            method:request.method,
            body:request.body
        })
    }
}
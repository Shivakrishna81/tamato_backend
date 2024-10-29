import { Injectable,Logger } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs'

@Injectable() 
export class AppLogger extends Logger{
    private readonly logDirectory:string; 

    constructor(){
        super();
        this.logDirectory=path.join(__dirname,"../../logs");
        if(!fs.existsSync(this.logDirectory)){
            fs.mkdirSync(this.logDirectory)
        }
    }

    logError(message:string,statusCode:number,metadata?:any){
        const logMessage=`[${new Date().toISOString()}] ERROR: ${message} (status:${statusCode})`
        if(metadata){
            this.writeLogToFile(`${logMessage}- Metadata: ${JSON.stringify(metadata)}`);
        }
        else{
            this.writeLogToFile(logMessage)
        }
        super.error(logMessage)
    }

    private writeLogToFile(logMessage:string){
        const filepath=path.join(this.logDirectory,'error.log');
        fs.appendFileSync(filepath,`${logMessage}\n`)
    }
}
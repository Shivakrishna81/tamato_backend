export interface ApiResponse{
    status:any;
    message:string;
    data?:any;
    code?:any;
}

export const HandleResponse=(status:number,message:string,data?:any,code?:any):any=>{
    return {
        status,
        message,
        data
    };
};
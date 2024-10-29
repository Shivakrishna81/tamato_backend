export interface ApiResponse{
    status:any;
    message:string;
    data?:any;
}

export const HandleResponse=(status:number,message:string,data?:any):any=>{
    return {
        status,
        message,
        data
    };
};
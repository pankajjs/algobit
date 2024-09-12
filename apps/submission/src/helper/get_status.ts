import  { Status } from "@prisma/client";

export const getStatus = (status: string)=>{
    if(status == "Success"){    
        return Status.Success;
    }else if(status == "WA"){
        return Status.WA;
    }else{
        return Status.Error
    }
}
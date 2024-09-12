import  { Status } from "@prisma/client/submission";

export const getStatus = (status: string)=>{
    if(status == "Success"){    
        return Status.Success;
    }else if(status == "WA"){
        return Status.WA;
    }else{
        return Status.Error
    }
}
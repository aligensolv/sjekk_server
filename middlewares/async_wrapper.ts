import { NextFunction, Request, Response } from "express";
import CustomError from "../interfaces/custom_error_class";
import { INTERNAL_SERVER } from "../constants/status_codes";

const asyncWrapper = (fn: Function) =>{
    return async (req: Request, res:Response, next: NextFunction) =>{
        try{
            await fn(req,res,next);
        }catch(error){            
            if(error instanceof CustomError){
                return next(error);
            }

            let custom_error: CustomError = new CustomError(error.message, INTERNAL_SERVER)
            return next(custom_error);
        }
    }
}

export default asyncWrapper
import { NextFunction, Request, Response } from "express";
import CustomError from "../interfaces/custom_error_class";
import { INTERNAL_SERVER } from "../constants/status_codes";

const promiseAsyncWrapepr = (fn: Function) =>{
    return async (resolve: any, reject? :any) =>{
        try{
            await fn(resolve,reject);
        }catch(error){            
            let custom_error: CustomError = new CustomError(error.message, INTERNAL_SERVER)
            return reject(custom_error);
        }
    }
}

export default promiseAsyncWrapepr
import { Request, Response, NextFunction } from "express"
import { BAD_REQUEST, NOT_AUTHORIZED } from "../constants/status_codes"

import { jwt_secret_key } from "../config"
import * as jwt from 'jsonwebtoken'
import CustomError from "../interfaces/custom_error_class"
import asyncWrapepr from "./async_wrapper"

const ValidateApiToken = asyncWrapepr(async (req: Request, res:Response, next:NextFunction) =>{
    const { token } = req.headers

    if(!token){
        let missing_token_error = new CustomError('Please provide api token',BAD_REQUEST)
        return next(missing_token_error)
    }
    
    let decoded_token: string = undefined

    jwt.verify(token as string, jwt_secret_key,{},(error,decoded) =>{
        if(error){
            let not_authorized_error = new CustomError('Invalid API token, Unauthorized',NOT_AUTHORIZED)
            return next(not_authorized_error)
        }

        decoded_token = decoded as string
    })
    
    return next()
})


export default ValidateApiToken
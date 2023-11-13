import { NextFunction, Request, Response } from "express";
import AuthRepository from "../repositories/Auth"
import UserCredentials from "../interfaces/user_credentials";
import { BAD_REQUEST, INTERNAL_SERVER, OK } from "../constants/status_codes";
import asyncWrapper from "../middlewares/async_wrapper";
import CustomError from "../interfaces/custom_error_class";
import SuccessLoginInterface from "../interfaces/success_login_result";

export const login = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            identifier,
            password
        } = req.body
    
        if(!identifier || !password){
            let missing_data_error = new CustomError('Please provide identifier and password', BAD_REQUEST)
            return next(missing_data_error)
        }
        let credentials: UserCredentials = {
            identifier: identifier,
            password: password
        }
        let success_login_result:SuccessLoginInterface = await AuthRepository.login(credentials)        
    
        return res.status(OK).json(success_login_result)
    }
)
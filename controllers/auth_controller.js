import AuthRepository from "../repositories/Auth.js"
import { BAD_REQUEST, INTERNAL_SERVER, OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import CustomError from "../interfaces/custom_error_class.js";

export const login = asyncWrapper(
    async (req, res, next) => {
        const {
            user_identifier,
            password
        } = req.body
    
        if(!user_identifier || !password){
            let missing_data_error = new CustomError('Please provide identifier and password', BAD_REQUEST)
            return next(missing_data_error)
        }
        let credentials = {
            identifier: user_identifier,
            password: password
        }
        let success_login_result = await AuthRepository.login(credentials)   
    
        return res.status(OK).json(success_login_result)
    }
)
import * as bcrypt from "bcrypt";
import UserCredentials from "../interfaces/user_credentials";
import UserCollection from "../models/User";
import UserRepository from "../repositories/User";
import * as jwt from "jsonwebtoken"
import { jwt_secret_key } from '../config'
import SuccessLoginInterface from "../interfaces/success_login_result";
import CustomError from "../interfaces/custom_error_class";
import { BAD_REQUEST, NOT_FOUND } from "../constants/status_codes";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper";


class Auth{
    static encryptPassword(password: string): Promise<string>{
        return new Promise(async (resolve, reject) =>{
            try{
                let hashedPassword = await bcrypt.hash(password,10)
                return resolve(hashedPassword)
            }catch(e){
                
                return reject(e.message);
            }
        })
    }

    static decryptAndCheckPasswordMatch(password:string, hashed: string): Promise<boolean>{
        return new Promise(async (resolve, reject) =>{
            try{
                let isMatch = await bcrypt.compare(password,hashed)
                
                return resolve(isMatch)
            }catch(e){
                return reject(e.message);
            }
        })
    }

    static login(credentials: UserCredentials): Promise<SuccessLoginInterface>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: SuccessLoginInterface) => any, reject: any) =>{
                let user = await UserRepository.getUserByIdentifier(credentials.identifier)
                if(!user){
                    let not_found_error = new CustomError(`User '${credentials.identifier}' does not exist`, NOT_FOUND)
                    return reject(not_found_error)
                }
    
                let isMatch = await this.decryptAndCheckPasswordMatch(credentials.password,user.password)
    
                if(!isMatch){
                    let password_not_match_error = new CustomError('Password mismatch', BAD_REQUEST)
                    
                    return reject(password_not_match_error)
                }
    
    
                let token = jwt.sign(
                    {username: user.name,id: user._id,role: 'user'},
                    jwt_secret_key,
                )
    
    
                return resolve({
                    token: token,
                    user_data: user
                })
            }
        ))
    }
}

export default Auth
import { NextFunction, Request, Response } from "express"
import UserRepository from "../repositories/User"
import { UserInterface, UserUpdateInterface } from "../interfaces/user_interface"
import * as moment from "moment"
import { INTERNAL_SERVER, NOT_CHANGED, NOT_FOUND, OK } from "../constants/status_codes"
import asyncWrapper from "../middlewares/async_wrapper"
import CustomError from "../interfaces/custom_error_class"

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        let users = await UserRepository.getAllUsers()
        return res.status(OK).json(users)
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}


export const registerUser = asyncWrapper(async (req: Request, res: Response) => {
    let data: UserInterface = req.body
    console.log(data);
        
    let registeredUser: UserInterface = await UserRepository.createUser(data)
    if(registeredUser){
        return res.status(OK).json(registeredUser)
    }

    return res.status(OK).json(54545454)
})


export const getUser = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
    
        let user:UserInterface | null = await UserRepository.getUser(id)
    
        if(user == null){
            let not_found_error = new CustomError('User not found', NOT_FOUND)
            return next(not_found_error)
        }
    
        return res.status(OK).json(user)
    }
)

export const updateUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const data: UserUpdateInterface = req.body

        let user: UserInterface | null = await UserRepository.getUser(id)

        if(user == null){
            return res.status(NOT_FOUND).json({
                success: false,
                message: 'User not found'
            })
        }

        let isUpdated = await UserRepository.updateUser(id, data)
        if(isUpdated){
            return res.status(OK).json({
                success: true,
                updated: data
            })
        }

        return res.status(NOT_CHANGED).json({
            success: false,
            message: 'no user was updated'
        })
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}
export const deleteUser = asyncWrapper(
    async (req: Request, res:Response, next: NextFunction) => {
        const { id } = req.params
        let user: UserInterface | null = await UserRepository.getUser(id)

        if(user == null){
            let not_found_error = new CustomError('User not found', NOT_FOUND)
            return next(not_found_error)
        }

        await UserRepository.deleteUser(id)

        let deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')

        return res.status(OK).json({
            success: true,
            deleted_at: deleted_at
        })
    }
)
export const deleteAllUsers = async (req: Request, res:Response) => {
    try{
        let total = await UserRepository.deleteAllUsers()

        return res.status(OK).json({
            success: true,
            total: total
        });
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}
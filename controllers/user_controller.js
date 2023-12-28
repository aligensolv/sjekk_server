import UserRepository from "../repositories/User.js"
import moment from "moment"
import { INTERNAL_SERVER, NOT_CHANGED, NOT_FOUND, OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import CustomError from "../interfaces/custom_error_class.js"
import UserInterface from "../interfaces/user_interface.js"

export const getAllUsers = asyncWrapper(
    async (req, res) => {
        let users = await UserRepository.getAllUsers()
        return res.status(OK).json(users)
    }
    
)

export const getUsersCount = asyncWrapper(
    async (req, res) => {
        let count = await UserRepository.getUsersCount()
        return res.status(OK).send(count)
    }
    
)

export const registerUser = asyncWrapper(async (req, res) => {
    let data = req.body
    let registeredUser = await UserRepository.createUser(data)
    
    if(registeredUser){
        return res.status(OK).json(registeredUser)
    }

    return res.status(OK).json(54545454)
})


export const getUser = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params
    
        let user = await UserRepository.getUser(id)
    
        if(user == null){
            let not_found_error = new CustomError('User not found', NOT_FOUND)
            return next(not_found_error)
        }
    
        return res.status(OK).json(user)
    }
)

export const updateUser = async (req, res) => {
    try{
        const { id } = req.params
        const data = req.body

        let user = await UserRepository.getUser(id)

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
    async (req, res, next) => {
        const { id } = req.params
        let user = await UserRepository.getUser(id)

        if(user == null){
            let not_found_error = new CustomError('User not found', NOT_FOUND)
            return next(not_found_error)
        }

        await UserRepository.deleteUser(id)

        let deleted_at = moment().format('DD.MM.YY HH:mm')

        return res.status(OK).json({
            success: true,
            deleted_at: deleted_at
        })
    }
)
export const deleteAllUsers = async (req, res) => {
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
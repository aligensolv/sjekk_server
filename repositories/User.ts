import UserCollection from "../models/User"
import AuthRepository from "../repositories/Auth"
import { UserInterface, UserUpdateInterface } from "../interfaces/user_interface"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper"
import * as moment from "moment"

class UserRepository{
    static createUser(data: UserInterface): Promise<UserInterface>{
        return new Promise(promiseAsyncWrapepr(async (resolve: (arg0: UserInterface) => any) => {
            let hashed = await AuthRepository.encryptPassword(data.password)
            let created_at = moment().format('YYYY-MM-DD HH:mm:ss')  

            let user = await UserCollection.create({
                ...data,
                password: hashed,
                created_at: created_at
            })
            return resolve(user)
        }))
    }

    static getAllUsers(): Promise<UserInterface[]>{
        return new Promise(async (resolve, reject) => {
            try{
                let users = await UserCollection.find({},{__v: false})
                return resolve(users)
            }catch(err){
                return reject(err.message)
            }
        })
    }

    static getUser(id: string): Promise<UserInterface | null>{
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserCollection.findOne({ _id: id }, { __v: false })
                return resolve(user)
            }catch(err){
                return reject(err.message)
            }
        })
    }

    static getUserByIdentifier(identifier: string): Promise<UserInterface | null>{
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserCollection.findOne({ identifier: identifier }, { __v: false })
                return resolve(user)
            }catch(err){
                return reject(err.message)
            }
        })
    }

    static updateUser(id: string, data: UserUpdateInterface): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try{
                let userUpdated = await UserCollection.updateOne({ _id: id}, data)
                resolve(userUpdated != null)
            }catch(err){
                return reject(err.message)
            }
        })
    }

    static deleteUser(id: string): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try{
                let userDeleted = await UserCollection.deleteOne({ _id: id })
                return resolve(true)
            }catch(err){
                return reject(err.message)
            }
        })
    }

    static deleteAllUsers(): Promise<number>{
        return new Promise(async (resolve, reject) => {
            try{
                let result = await UserCollection.deleteMany()
                return resolve(result.deletedCount)
            }catch(err){
                return reject(err.message)
            }
        })
    }
}

export default UserRepository
import UserCollection from "../models/User.js"
import AuthRepository from "./Auth.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import moment from "moment"
import UserInterface from "../interfaces/user_interface.js"
import CustomError from "../interfaces/custom_error_class.js"
import { ALREADY_EXISTS } from "../constants/status_codes.js"

class UserRepository{
    static createUser(data){         
        return new Promise(promiseAsyncWrapepr(async (resolve,reject) => {
            let existingUser = await this.getUserByIdentifier(data.user_identifier)

            if(existingUser != null){
                let identifier_already_existing = new CustomError(`Identifier ${data.user_identifier} already exists`, ALREADY_EXISTS)
                return reject(identifier_already_existing)
            }

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

    static getAllUsers(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let users = await UserCollection.find({},{__v: false})
                return resolve(users)
            }
        ))
    }

    static getUsersCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let count = await UserCollection.countDocuments()
                return resolve(count.toString())
            }
        ))
    }

    static getUser(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let user = await UserCollection.findOne({ _id: id }, { __v: false })
                return resolve(user)
            }
        ))
    }

    static getUserByIdentifier(identifier){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let user = await UserCollection.findOne({ user_identifier: identifier }, { __v: false })
                return resolve(user)
            }
        ))
    }

    static updateUser(id, data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let userUpdated = await UserCollection.updateOne({ _id: id}, data)
                resolve(userUpdated != null)
            }
        ))
    }

    static deleteUser(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let userDeleted = await UserCollection.deleteOne({ _id: id })
                return resolve(true)
            }
        ))
    }

    static deleteAllUsers(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let result = await UserCollection.deleteMany()
                return resolve(result.deletedCount)
            }
        ))
    }
}

export default UserRepository
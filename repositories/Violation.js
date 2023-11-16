import { NOT_FOUND } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Violation from "../models/Violation.js";
import moment from "moment";

class ViolationRepository{
    static getAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find()
                return resolve(violations)
            }
        ))
    }

    static getAllPlaceViolations(place){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ place: place})
                return resolve(violations)
            }
        ))
    }

    static getViolation(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violation = await Violation.findOne({ _id: id })
                if(!violation){
                    let not_found_error = new CustomError('Violation not found',NOT_FOUND)
                    return reject(not_found_error)
                }

                return resolve(violation)
            }
        ))
    }

    static getCompletedViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ status: 'completed' })
                return resolve(violations)
            }
        ))
    }

    static getSavedViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ status: 'saved' })
                return resolve(violations)
            }
        ))
    }

    static createViolation(data){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let created_at = moment().format('YYYY-MM-DD HH:mm:ss')

                let newViolation = await Violation.create({
                    ...data,
                    created_at: created_at
                })
                return resolve(newViolation)
            }
        ))
    }

    static deleteViolation(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violationExists = await Violation.findOne({ _id: id })
                if(!violationExists){
                    let not_found_error = new CustomError('violation not found', NOT_FOUND)
                    return reject(not_found_error)
                }

                return resolve(true)
            }
        ))
    }

    static deleteAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                await Violation.deleteMany({})
                return resolve(true)
            }
        ))
    }
}

export default ViolationRepository
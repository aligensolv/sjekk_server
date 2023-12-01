import { NOT_FOUND } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Violation from "../models/Violation.js";
import moment from "moment";
import RuleRepository from "./Rule.js";

class ViolationRepository{
    static getAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find()
                return resolve(violations)
            }
        ))
    }

    static getViolationsCount(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let count = await Violation.countDocuments()
                return resolve(count.toString())
            }
        ))
    }

    static completeViolation(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let result = await Violation.updateOne({_id: id}, {
                    status: 'completed',
                    completed_at: moment().format('YYYY-MM-DD HH:mm:ss')
                })

                return resolve(result.modifiedCount > 0)
            }
        ))
    }

    static updateViolation(id, data){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let result = await Violation.updateOne({_id: id}, data)

                return resolve(result.modifiedCount)
            }
        ))
    }

    static getAllPlaceViolations(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({place: id}).populate([
                    {
                        path: 'publisher_identifier',
                        ref: 'User'
                    },

                    {
                        path: 'rules',
                        ref: 'Rule'
                    },

                    {
                        path: 'place',
                        ref: 'Place'
                    }
                ])
                console.log(violations);
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

    static getCompletedViolations(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ publisher_identifier: id,status: 'completed' }).populate([
                    {
                        path: 'publisher_identifier',
                        ref: 'User'
                    },

                    {
                        path: 'rules',
                        ref: 'Rule'
                    },

                    {
                        path: 'place',
                        ref: 'Place'
                    }
                ])

                return resolve(violations)
            }
        ))
    }

    static getSavedViolations(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ publisher_identifier:id,status: 'saved' }).populate([
                    {
                        path: 'publisher_identifier',
                        ref: 'User'
                    },

                    {
                        path: 'rules',
                        ref: 'Rule'
                    },

                    {
                        path: 'place',
                        ref: 'Place'
                    }
                ])
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

                return resolve(newViolation.populate([
                    {
                        path: 'publisher_identifier',
                        ref: 'User'
                    },

                    {
                        path: 'rules',
                        ref: 'Rule'
                    },

                    {
                        path: 'place',
                        ref: 'Place'
                    }
                ]))
            }
        ))
    }

    static deleteViolation(id){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violationExists = await Violation.findById(id)
                if(!violationExists){
                    let not_found_error = new CustomError('violation not found', NOT_FOUND)
                    return reject(not_found_error)
                }

                await Violation.deleteOne({ _id: id })

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

    static addImage(id,image){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violation = await Violation.findOne({ _id: id })
                violation.images.push(image)
                await violation.save()
                return resolve(image)
            }
        ))
    }

    static addRule(id,rule){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violation = await Violation.findOne({ _id: id })
                violation.rules.push(rule)
                await violation.save()

                let rule_data = await RuleRepository.getRule(rule)
                console.log(rule_data);
                return resolve(rule_data)
            }
        ))
    }
    static updateInnerComment(id,comment){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violation = await Violation.findOne({ _id: id })
                violation.paper_comment = comment
                await violation.save()

                return resolve(comment)
            }
        ))
    }
    static updateOutterComment(id,comment){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violation = await Violation.findOne({ _id: id })
                violation.out_comment = comment
                await violation.save()

                return resolve(comment)
            }
        ))
    }
}

export default ViolationRepository
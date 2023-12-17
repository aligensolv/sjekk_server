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

    static getAllPlaceViolations(id,date){
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
                ]).sort({
                    created_at: 'desc'
                })
                violations = violations.filter(e => {
                    return !moment(e.completed_at).isBefore(
                        moment(date)
                    )
                })
                
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

    static getCompletedViolations(id,date){
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
                ]).sort({
                    created_at: 'desc'
                })

                violations = violations.filter(e => {
                    return !moment(e.completed_at).isBefore(
                        moment(date)
                    )
                })

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
                ]).sort({
                    created_at: 'desc'
                })
                
                return resolve(violations)
            }
        ))
    }

    static searchExistingSavedViolation(plate){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let violations = await Violation.find({ status: 'saved' }).populate([
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
                ]).sort({
                    created_at: 'desc'
                })
                violations = violations.filter(violation => {
                    return violation.plate_info.plate.toLowerCase().replace(/\s/g, '') == plate.toLowerCase().replace(/\s/g, '')
                })

                if(violations.length == 0) {
                    let not_found_error = new CustomError('No violation was found', NOT_FOUND)
                    return reject(not_found_error)
                }
                
                console.log(violations[0]);
                return resolve(violations[0])
            }
        ))
    }

    static createViolation(data){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                let completed_at = moment(data.completed_at).format('YYYY-MM-DD HH:mm:ss')

                let newViolation = await Violation.create({
                    ...data,
                    completed_at: completed_at
                })

                let populated = await newViolation.populate([
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

                console.log(populated);

                return resolve(populated)
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
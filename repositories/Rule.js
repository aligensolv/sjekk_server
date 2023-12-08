import mongoose from "mongoose";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Rule from "../models/Rule.js";
import moment from "moment";

class RuleRepository{
    static getAllRules(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let rules = await Rule.find().sort({
                    created_at: 'desc'
                })
                return resolve(rules)
            }
        ))
    }

    static getRulesCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let count = await Rule.countDocuments()
                return resolve(count.toString())
            }
        ))
    }

    static getRule(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let rule = await Rule.findById(id);
                return resolve(rule)
            }
        ))
    }

    static createRule(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let created_at = moment().format('YYYY-MM-DD HH:mm:ss')
                let rule = await Rule.create({
                    ...data,
                    created_at: created_at
                })
                return resolve(rule)
            }
        ))
    }

    static updateRule(id,data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let response = await Rule.updateOne({ _id:id },data);
                return resolve(response.modifiedCount > 0)
            }
        ))
    }

    static deleteRule(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let response = await Rule.deleteOne({ _id: id })
                return resolve(response.deletedCount > 0)
            }
        ))
    }

    static deleteAllRules(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                await Rule.deleteMany({})
                return resolve(true)
            }
        ))
    }
}


export default RuleRepository
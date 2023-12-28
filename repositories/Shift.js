import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import Shift from "../models/Shift.js"
import moment from "moment"
import UserRepository from "./User.js"
import CustomError from "../interfaces/custom_error_class.js"
import { NOT_FOUND } from "../constants/status_codes.js"

class ShiftRepository{
    static getAllShifts(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let shifts = await Shift.find().sort({
                    created_at: 'desc'
                })
                return resolve(shifts)
            }
        ))
    }

    static getAllTodayShifts(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let current_date = moment('YYYY-MM-DD')
                let shifts = await Shift.find().sort({
                    created_at: 'desc'
                })
                shifts = shifts.filter((shift) => {
                    let start_date = moment(moment(shift.start_date).format('YYYY-MM-DD'))
                    return moment(start_date).isSame(current_date)
                })

                return resolve(shifts)
            }
        ))
    }

    static getUserShifts(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let user = await UserRepository.getUserByIdentifier(id).sort({
                    created_at: 'desc'
                })
                if(!user){
                    let not_exist_error = new CustomError('User not found', NOT_FOUND)
                    return reject(not_exist_error)
                }

                let shifts = await Shift.find({ user_identifier: id })
                return resolve(shifts)
            }
        ))
    }

    static getShiftsByDate(date){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let shifts = await Shift.find({ start_date: date }).sort({
                    created_at: 'desc'
                })
                return resolve(shifts)
            }
        ))
    }

    static createShift(user_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let current_date = moment().format('DD.MM.YY HH:mm')

                let shift = await Shift.create({
                    start_date: current_date,
                    user_identifier: user_id,
                    created_at: moment().format('DD.MM.YY HH:mm')
                })

                return resolve(shift)
            }
        ))
    }

    static endShift(shift_id, logins){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let end_date = moment().format('DD.MM.YY HH:mm')

                await Shift.updateOne({ _id: shift_id },{
                    end_date: end_date,
                    total_completed_violations: 0,
                    logins: logins
                })

                return resolve(true)
            }
        ))
    }
}

export default ShiftRepository
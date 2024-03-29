import moment from "moment";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Car from "../models/Car.js";
import CustomError from "../interfaces/custom_error_class.js";
import { NOT_FOUND } from "../constants/status_codes.js";
import AutosysRepository from "./Autosys.js";
import logger from '../utils/logger.js'

class CarRepository{
    static getAllCars(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let cars = await Car.find().populate({
                    path: 'place',
                    ref: 'Place'
                }).sort({
                    created_at: 'desc'
                })
                return resolve(cars)
            }
        ))
    }

    static getCarsCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let count = await Car.find().countDocuments()
                return resolve(count.toString())
            }
        ))
    }

    static getAllCarsByPlace(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let cars = await Car.find({ place: id }).populate({
                    path: 'place',
                    ref: 'Place'
                }).sort({
                    created_at: 'desc'
                })

                return resolve(cars)
            }
        ))
    }

    static getCar(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let car = await Car.findOne({ _id:id }).populate({
                    path: 'place',
                    ref: 'Place'
                })
                return resolve(car)
            }
        ))
    }

    static getCarByPlate(plate_number){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let car = await Car.findOne({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                }).populate({
                    path: 'place',
                    ref: 'Place'
                })

                
                if(!car){
                    let not_found_error = new CustomError('Could not find car', NOT_FOUND)
                    return reject(not_found_error)
                }

                return resolve(car)
            }
        ))
    }

    static createCar(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let created_at = moment().format('DD.MM.YY HH:mm')
                let autosys_car_data = await AutosysRepository.getPlateInformation(data.plate_number.toUpperCase().replace(/\s/g, ''))

                if(!autosys_car_data){
                    let not_found_error = new CustomError('Could not find car data', NOT_FOUND)
                    return reject(not_found_error)
                }

                let car = await Car.create({
                    ...data,
                    plate_number: data.plate_number.toUpperCase().replace(/\s/g, ''),
                    ...autosys_car_data,
                    start_date: moment(data.start_date).format('DD.MM.YY HH:mm'),
                    end_date: moment(data.end_date).format('DD.MM.YY HH:mm'),
                    created_at: created_at
                })

                return resolve(car)
            }
        ))
    }

    static updateCar(id,data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let update_result = await Car.updateOne({_id:id},{
                    ...data,
                    start_date: moment(data.start_date).format('DD.MM.YY HH:mm'),
                    end_date: moment(data.end_date).format('DD.MM.YY HH:mm')
                })
                return resolve(update_result.modifiedCount > 0)
            }
        ))
    }

    static deleteCar(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{

                let delete_result = await Car.deleteOne({ _id: id })
                return resolve(delete_result.deletedCount > 0)
            }
        ))
    }

    static deleteAllCars(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                return new Promise(promiseAsyncWrapepr(
                    async (resolve, reject) =>{
                        await Car.deleteMany()
                        return resolve(true)
                    }
                ))   
            }
        ))
    }
}

export default CarRepository
import moment from "moment";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import CustomError from "../interfaces/custom_error_class.js";
import { NOT_FOUND } from "../constants/status_codes.js";
import AutosysRepository from "./Autosys.js";

import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js";

class CarRepository{
    static prisma = new PrismaClient()

    static getAllCars(){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const cars = await this.prisma.registeredCar.findMany({
                    where: {
                        deleted_at: null
                    },
                    include: {
                        place: {
                            include: {
                                normal_place: true,
                                apartment: true,
                                residential: true
                            }
                        },
                        normal_car: {
                            include: {
                                registered_car: true
                            }
                        },
                        residential_car: true,
                        apartment_car: true
                    }
                })
                return resolve(cars)
            }
        ))
    }

    static getCarsCount(){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const count = await this.prisma.car.count()
                return resolve(count)
            }
        ))
    }

    static getAllCarsByPlace({ place_id }) {
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const cars = await this.prisma.registeredCar.findMany({
                    where: {
                        place_id: +place_id
                    },
                    include: {
                        place: {
                            include: {
                                normal_place: true,
                                apartment: true,
                                residential: true
                            }
                        },
                        residential_car: true,
                        normal_car: {
                            include: {
                                registered_car: true
                            }
                        },
                        apartment_car: true
                    }
                })

                return resolve(cars)
            }
        ))
    }

    static getCar({ car_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const car = await this.prisma.car.findFirst({
                    where: {
                        id: +car_id
                    },
                    include: {
                        place: true
                    }
                })
                return resolve(car)
            }
        ))
    }

    static getCarByPlate({ plate_number }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const car = await this.prisma.car.findFirst({
                    where: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                    },
                    include: {
                        place: true
                    }
                })

                
                if(!car){
                    let not_found_error = new CustomError('Could not find car', NOT_FOUND)
                    return reject(not_found_error)
                }

                return resolve(car)
            }
        ))
    }

    static createCar({ plate_number, start_date, end_date, registration_type, place_id }) {
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const exists = await this.prisma.registeredCar.findFirst({
                    where: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                    }
                })

                if(exists){
                    let exists_error = new CustomError('Car already exists', NOT_FOUND)
                    return reject(exists_error)
                }

                let created_at = TimeRepository.getCurrentTime()
                let autosys_car_data = await AutosysRepository.getPlateInformation({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                })

                if(!autosys_car_data){
                    let not_found_error = new CustomError('Could not find car data', NOT_FOUND)
                    return reject(not_found_error)
                }
                
                console.log(place_id);
                const place = await this.prisma.normalPlace.findUnique({
                    where: {
                        place_id: +place_id
                    }
                })
                console.log(place);

                const car = await this.prisma.registeredCar.create({
                    data: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        manufacture_year: autosys_car_data.manufacture_year,
                        car_model: autosys_car_data.car_model,
                        car_description: autosys_car_data.car_description,
                        car_color: autosys_car_data.car_color,
                        car_type: autosys_car_data.car_type,

                        place_id: +place_id,
                        registration_type: 'normal',
                        normal_car: {
                            create: {
                                free_parking_hours: 2,
                                registeration_date: start_date,
                                expire_date: end_date,
                                registeration_source: 'system',
                                normal_place_id: place.id,
                                created_at: created_at
                            }
                        }

                    }
                })

                if(car){
                    const place = await this.prisma.place.findUnique({
                        where: {
                            id: +place_id
                        }
                    })

                    await this.prisma.carLog.create({
                        data: {
                            start_date,
                            end_date,
                            created_at,
                            registered_by: 'system',
                            place_location: place.location,
                            place_code: place.code,
                            place_policy: place.policy,
                            plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                            car_model: autosys_car_data.car_model,
                            car_color: autosys_car_data.car_color,
                            car_type: autosys_car_data.car_type,
                            car_description: autosys_car_data.car_description,
                            place_id: +place_id
                        }
                    })
                }

                return resolve(car)
            }
        ))
    }

    static updateCar({ car_id, start_date, end_date, plate_number }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const updated = await this.prisma.car.update({
                    where: {
                        id: +car_id
                    },
                    data: {
                        start_date, end_date, plate_number
                    }
                })
                return resolve(updated)
            }
        ))
    }

    static deleteCar({ car_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{

                const deleted = await this.prisma.registeredCar.update({
                    where: {
                        id: +car_id
                    },
                    data: {
                        deleted_at: TimeRepository.getCurrentTime()
                    }
                })

                await this.prisma.normalCar.update({
                    where: {
                        registered_car_id: +car_id
                    },
                    data: {
                        deleted_at: TimeRepository.getCurrentTime()
                    }
                })

                // await this.prisma.residentialCar.update({
                //     where: {
                //         registered_car_id: +car_id
                //     },
                //     data: {
                //         deleted_at: TimeRepository.getCurrentTime()
                //     }
                // })
                return resolve(deleted)
            }
        ))
    }

    static deleteAllCars(){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                await this.prisma.car.deleteMany({})
                return resolve(true)
            }
        ))
    }
}

export default CarRepository
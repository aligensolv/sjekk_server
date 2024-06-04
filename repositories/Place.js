import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import AutosysRepository from "./Autosys.js";
import CustomError from "../interfaces/custom_error_class.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/status_codes.js";

import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js";

class PlaceRepository{
    static prisma = new PrismaClient()
    static getAllPlaces(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.place.findMany({
                        where: {
                            deleted_at: null
                        },
                        orderBy: {
                            created_at: 'desc'
                        },
                        include: {
                            partner: true
                        }
                    })
                    return resolve(places)
                }
            )
        )
    }

    static getPlacesCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const count = await this.prisma.place.count()
                    return resolve(count)
                }
            )
        )
    }

    static getPlace({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const place = await this.prisma.place.findUnique({
                    where: {
                        id: +place_id
                    }
                })


                return resolve(place)
            }
        ))
    }

    static createPlace({ location, policy, code }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const created_at = await TimeRepository.getCurrentTime()
                const place = await this.prisma.place.create({
                    data: {
                        location, policy, code, created_at, is_verified: true
                    }
                })
                return resolve(place)
            }
        ))
    }

    static updatePlace({ place_id, location, policy, code, partner_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const updated = await this.prisma.place.update({
                    where: {
                        id: +place_id
                    },
                    data: {
                        location, policy, code, partner_id: partner_id != undefined ? +partner_id : null
                    }
                })

                return resolve(updated)
            }
        ))
    }

    static deletePlace({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.place.update({
                    where: {
                        id: +place_id
                    },
                    data: {
                        deleted_at
                    }
                })
    
                return resolve(deleted)
            }
        ))
    }

    static async deletePlaceDashboard ({ dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted = await this.prisma.placeDashboard.delete({
                    where: {
                        id: +dashboard_id
                    }
                })
    
                return resolve(deleted)
            }
        ))
    }

    static deleteAllPlaces(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.place.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })
                return resolve(deleted)
            }
        ))
    }

    static createPlaceDashboard({ place_id, access_code, access_username, place_name, place_type, free_parking_hours }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const created_at = await TimeRepository.getCurrentTime()
                const dashboard = await this.prisma.placeDashboard.create({
                    data: {
                        place_id: +place_id, 
                        access_code, access_username,
                        place_name, place_type, free_parking_hours, created_at
                    }
                })

                return resolve(dashboard)
            }
        ))
    }

    static getAllPlaceDashboards({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const dashboards = await this.prisma.placeDashboard.findMany({
                    where: {
                        place_id: +place_id
                    }
                })
                return resolve(dashboards)
            }
        ))
    }

    static async createCarFromPlaceDashboard({ plate_number, dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                let is_car_registered = await this.prisma.car.findFirst({
                    where: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                    }
                })

                if(is_car_registered){
                    const registeration_already_exists = new CustomError('Car is already registered', BAD_REQUEST)
                    return reject(registeration_already_exists)
                }

                let place_dashboard = await this.prisma.placeDashboard.findUnique({
                    where: {
                        id: +dashboard_id
                    },
                    include: {
                        place: true
                    }
                })

                if(!place_dashboard){
                    let place_profile_not_found = new CustomError('Place Dashboard not found', NOT_FOUND)
                    return reject(place_profile_not_found)
                }

                const free_parking_hours = place_dashboard.free_parking_hours
                const start_date = await TimeRepository.getCurrentTime()
                const created_at = await TimeRepository.getCurrentTime()
                const autosys_car_data = await AutosysRepository.getPlateInformation({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                })



                const car = await this.prisma.car.create({
                    data: {
                        manufacture_year: autosys_car_data.manufacture_year,
                        car_model: autosys_car_data.car_model,
                        car_description: autosys_car_data.car_description,
                        car_color: autosys_car_data.car_color,
                        car_type: autosys_car_data.car_type,
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        start_date,
                        end_date: await TimeRepository.increaseTimeByHours({
                            hours: +free_parking_hours,
                            current_time: start_date
                        }),
                        registration_source: 'gateway',
                        registration_type: 'External',
                        source_id: +dashboard_id,
                        place_id: place_dashboard.place_id,
                        free_parking_hours,
                        created_at
                    }
                })

                await this.prisma.carLog.create({
                    data: {
                        start_date,
                        end_date: await TimeRepository.increaseTimeByHours({
                            hours: +free_parking_hours,
                            current_time: start_date
                        }),
                        created_at,
                        registration_source: 'gateway',
                        registered_by: place_dashboard.place_name,
                        place_location: place_dashboard.place.location,
                        place_code: place_dashboard.place.code,
                        place_policy: place_dashboard.place.policy,
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        car_model: autosys_car_data.car_model,
                        car_color: autosys_car_data.car_color,
                        car_type: autosys_car_data.car_type,
                        car_description: autosys_car_data.description,
                        place_id: place_dashboard.place_id
                    }
                })
        
                // await scheduleCarForRemove(+free_parking_time, car.id)
                return resolve(car)
            }
        ))
    }

    static async getAllCarsRegisteredByPlaceDashboard({ place_dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                let registered_cars = await this.prisma.car.findMany({
                    where: {
                        source_id: +place_dashboard_id,
                        registration_source: 'gateway',
                    }
                })

                registered_cars = registered_cars.map(car => {
                    return {
                        start_date: car.start_date,
                        end_date: car.end_date,
                        plate_number: car.plate_number
                    }
                })
                return resolve(registered_cars)
            }
        ))
    }
}


export default PlaceRepository
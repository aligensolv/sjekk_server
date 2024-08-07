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
                            normal_place: true,
                            apartment: true,
                            residential: true
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
                const created_at = TimeRepository.getCurrentTime()
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
        console.log(" i got deleted");
        console.log(place_id);
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted_at = TimeRepository.getCurrentTime()
                const deleted = await this.prisma.place.update({
                    where: {
                        id: +place_id
                    },
                    data: {
                        deleted_at
                    }
                })

                if(deleted.place_type == 'residential'){
                    const x = await this.prisma.residentialQuarter.update({
                        where: {
                            place_id: +place_id
                        },
                        data: {
                            deleted_at: deleted_at
                        },
                        include: {
                            residential_dashboard: true
                        }
                    })

                    if(x.residential_dashboard != null){
                        await this.prisma.residentialDashboard.delete({
                            where: {
                                residential_quarter_id: x.id
                            }
                        })
                    }
                }else if(deleted.place_type == 'normal'){
                    const x = await this.prisma.normalPlace.update({
                        where: {
                            place_id: deleted.id
                        },
                        data: {
                            deleted_at: deleted_at
                        }
                    })
                }
    
                return resolve(deleted)
            }
        ))
    }

    static async deletePlaceDashboard ({ dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted = await this.prisma.normalPlaceDashboard.delete({
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

                await this.prisma.normalPlace.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })

                await this.prisma.residentialQuarter.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })

                await this.prisma.apartment.updateMany({
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
                const created_at = TimeRepository.getCurrentTime()
                const dashboard = await this.prisma.normalPlaceDashboard.create({
                    data: {
                        normal_place_id: +place_id, 
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
                const dashboards = await this.prisma.normalPlaceDashboard.findMany({
                    where: {
                        normal_place_id: +place_id
                    }
                })
                return resolve(dashboards)
            }
        ))
    }

    static async createCarFromPlaceDashboard({ plate_number, dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                let is_car_registered = await this.prisma.registeredCar.findFirst({
                    where: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                    }
                })

                if(is_car_registered){
                    const registeration_already_exists = new CustomError('Car is already registered', BAD_REQUEST)
                    return reject(registeration_already_exists)
                }

                let place_dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        id: +dashboard_id
                    },
                    include: {
                        normal_place: true
                    }
                })

                if(!place_dashboard){
                    let place_profile_not_found = new CustomError('Place Dashboard not found', NOT_FOUND)
                    return reject(place_profile_not_found)
                }

                const free_parking_hours = place_dashboard.free_parking_hours
                const start_date =  TimeRepository.getCurrentTime()
                const created_at = TimeRepository.getCurrentTime()
                const autosys_car_data = await AutosysRepository.getPlateInformation({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                })



                const car = await this.prisma.registeredCar.create({
                    data: {
                        
                        manufacture_year: autosys_car_data.manufacture_year ?? 'N/A',
                        car_model: autosys_car_data.car_model ?? 'N/A',
                        car_description: autosys_car_data.car_description ?? 'N/A',
                        car_color: autosys_car_data.car_color ?? 'N/A',
                        car_type: autosys_car_data.car_type ?? 'N/A',
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        start_date,
                        end_date: TimeRepository.increaseTimeByHours({
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
        
                // await scheduleCarForRemove(+free_parking_time, car.id)
                return resolve(car)
            }
        ))
    }

    static async getAllCarsRegisteredByPlaceDashboard({ place_dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        id: +place_dashboard_id
                    },
                    include: {
                        normal_place: true
                    }
                })
                let registered_cars = await this.prisma.normalCar.findMany({
                    where: {
                        normal_place_id: dashboard.normal_place_id
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
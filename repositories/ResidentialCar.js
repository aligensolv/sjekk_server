import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import AutosysRepository from "./Autosys.js"
import TimeRepository from "./Time.js"

class ResidentialCarRepository{
    static prisma = PrismaClientService.instance
    
    static getAllResidentialCars = async () => new Promise(promiseAsyncWrapper(
        async (resolve) =>{
            const cars = await this.prisma.registeredCar.findMany({
                where: {
                    registration_type: 'residential',
                    deleted_at: null
                },
                include: {
                    residential_car: true
                }
            })

            return resolve(cars)
        }
    ))

    static getResidentialCarsByQuarter = async ({ residential_quarter_id }) => new Promise(promiseAsyncWrapper(
        async (resolve) =>{
            const cars = await this.prisma.residentialCar.findMany({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    deleted_at: null
                },
                include: {
                    registered_car: true
                }
            })

            return resolve(cars)
        }
    ))

    static registerResidentialCar = async ({ plate_number, parking_type, subscription_plan_days, residential_quarter_id }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {
            const created_at = TimeRepository.getCurrentTime()
            const car_data = await AutosysRepository.getPlateInformation({ plate_number })

            const residential_quarter = await this.prisma.residentialDashboard.findUnique({
                where: {
                    residential_quarter_id: +residential_quarter_id
                },
                include: {
                    residential_quarter: true
                }
            })

            if(residential_quarter.current_total_registered_cars >= residential_quarter.max_cars_registrations){
                const error = new CustomError('Max cars registrations reached', BAD_REQUEST)
                return reject(error)
            }
            

            const isRegistrationExist = await this.prisma.registeredCar.findFirst({
                where: {
                    plate_number,
                    deleted_at: null
                },
                include: {
                    residential_car: true
                }
            })

            if(isRegistrationExist){
                const error = new CustomError(`Car already registered as ${isRegistrationExist.residential_car.parking_type}`, BAD_REQUEST)
                return reject(error)
            }

            const registeredCar = await this.prisma.registeredCar.create({
                data: {
                    plate_number: car_data.plate_number,
                    car_model: car_data.car_model,
                    car_color: car_data.car_color,
                    car_type: car_data.car_type,
                    car_description: car_data.car_description,
                    manufacture_year: car_data.manufacture_year,
                    registration_type: 'residential',
                    place_id: residential_quarter.residential_quarter.place_id,

                    residential_car: {
                        create: {
                            subscription_plan_days: +subscription_plan_days,
                            parking_type,
                            registration_date: created_at,
                            expire_date: TimeRepository.increaseTimeByDays({
                                current_time: created_at,
                                days: +subscription_plan_days
                            }),
                            residential_quarter_id: +residential_quarter_id
                        }
                    }
                    
                }
            })

            await this.prisma.residentialDashboard.update({
                where: {
                    id: +residential_quarter_id
                },
                data: {
                    current_total_registered_cars: {
                        increment: 1
                    }
                }
            })
            return resolve(registeredCar)
        }
    ))

    static deleteResidentialCar = async ({ residential_car_id }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {
            const registeredCar = await this.prisma.residentialCar.update({
                where: {
                    id: +residential_car_id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentTime()
                }
            })

            await this.prisma.residentialDashboard.update({
                where: {
                    id: registeredCar.residential_quarter_id
                },
                data: {
                    current_total_registered_cars: {
                        decrement: 1
                    }
                }
            })

            await this.prisma.registeredCar.update({
                where: {
                    id: registeredCar.registered_car_id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentTime()
                }
            })
            return resolve(true)
        }
    ))

    static getResidentialDashboardStatistics = async ({ residential_quarter_id }) => new Promise(promiseAsyncWrapper(
        async (resolve) => {
            const guest_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    parking_type: 'guest',
                }
            })

            const reserved_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    parking_type: 'reserved',
                }
            })

            const total_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id
                }
            })

            return resolve({
                guest_cars_count,
                reserved_cars_count,
                total_cars_count
            })
        }
    ))
}

export default ResidentialCarRepository
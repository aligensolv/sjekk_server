import PlaceCollection from "../models/Place.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";
import PlaceProfileModel from "../models/PlaceProfile.js";
import AutosysRepository from "./Autosys.js";
import CarModel from "../models/Car.js";
import CustomError from "../interfaces/custom_error_class.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/status_codes.js";
import { scheduleCarForRemove } from "../utils/agenda_client.js";
import CarRepository from "./Car.js";
import PlaceModel from "../models/Place.js";
import CarLogModel from "../models/CarLogs.js";
import jwt from 'jsonwebtoken'
import { jwt_secret_key } from "../config.js";

class PlaceRepository{
    static getAllPlaces(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let places = await PlaceCollection.find().sort({
                    created_at: 'desc'
                }).populate({
                    path: 'partner',
                    ref: 'Partner',
                })
                return resolve(places)
            }
        ))
    }

    static getPlacesCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let count = await PlaceCollection.countDocuments()
                return resolve(count.toString())
            }
        ))
    }

    static getPlace(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let place = await PlaceCollection.findOne({
                    _id: id
                })


                return resolve(place)
            }
        ))
    }

    static createPlace(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let place = await PlaceCollection.create({
                    ...data,
                    created_at: moment().format('DD.MM.YY HH:mm')
                })
                return resolve(place)
            }
        ))
    }

    static updatePlace(id, data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let updated = await PlaceCollection.updateOne({
                    _id: id
                }, data)

                return resolve(updated.modifiedCount > 0)
            }
        ))
    }

    static deletePlace(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let deleted = await PlaceCollection.deleteOne({
                    _id: id
                })
    
                return resolve(deleted.deletedCount > 0)
            }
        ))
    }

    static deleteAllPlaces(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let deleted = await PlaceCollection.deleteMany()
                return resolve(deleted.deletedCount)
            }
        ))
    }

    static createPlaceLink(id,data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let place_profile = new PlaceProfileModel({
                    ...data,
                    created_at: moment().format('DD.MM.YY HH:mm'),
                    place: id
                })

                // let generated_link = `https://reg.gensolv.no/clients/${place_profile._id}`
                let generated_link = `https://reg.gensolv.no/clients/${place_profile._id}`
                place_profile.access_link = generated_link

                await place_profile.save()

                return resolve(place_profile)
            }
        ))
    }

    static getPlaceProfile(client){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let place_profile = await PlaceProfileModel.findOne({
                    _id: client
                }).populate({
                    path: 'place',
                    ref: 'Place'
                })

                return resolve(place_profile)
            }
        ))
    }

    static getAllPlaceProfiles(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let place_profiles = await PlaceProfileModel.find({
                    place: id
                }).populate({
                    path: 'place',
                    ref: 'Place'
                })

                return resolve(place_profiles)
            }
        ))
    }

    static async createCarFromPlaceDashboard(plate_number, configs){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let is_car_registered = await CarModel.findOne({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                })

                if(is_car_registered){
                    const registeration_already_exists = new CustomError('Car is already registered', BAD_REQUEST)
                    return reject(registeration_already_exists)
                }

                let place_profile = await PlaceProfileModel.findOne({
                    _id: configs.client
                })
        
                if(!place_profile){
                    let place_profile_not_found = new CustomError('Place profile not found', NOT_FOUND)
                    return reject(place_profile_not_found)
                }

                const free_parking_time = place_profile.free_parking_hours
                const start_date = moment().format('DD.MM.YY HH:mm')
                let created_at = moment().format('DD.MM.YY HH:mm')
                let autosys_car_data = await AutosysRepository.getPlateInformation(plate_number.toUpperCase().replace(/\s/g, ''))

                if(!autosys_car_data){
                    let not_found_error = new CustomError('Could not find car data', NOT_FOUND)
                    return reject(not_found_error)
                }

                let car = new CarModel({
                    ...autosys_car_data,
                    plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                    registeration_source: configs.registeration_source,
                    start_date: start_date,
                    end_date: moment(start_date, 'DD.MM.YY HH:mm').add(+free_parking_time, 'hours').format('DD.MM.YY HH:mm'),
                    created_at: created_at,
                })

                car.place = place_profile.place
                car.free_parking_time = +free_parking_time
                car.registeration_source = place_profile.name
                car.registeration_source_id = configs.registeration_source_id
                car.registeration_type = 'gateway'

                await car.save()

                let place = await PlaceModel.findOne({
                    _id: place_profile.place
                })

                let car_log = new CarLogModel({
                    plate_number: car.plate_number,
                    start_date: car.start_date,
                    end_date: car.end_date,
                    registered_by: car.registeration_source,
                    place: {
                      location: place.location,
                      code: place.code,
                    },
                    registeration_data:{
                      place_id: place._id,
                      gateway: place.location,
                      car_details:{
                        brand: car.brand,
                        description: car.description,
                        color: car.color,
                        type: car.type
                      }
                    },
                    created_at: moment().format('DD.MM.YY HH:mm')
                  })
              
                  await car_log.save()

                await scheduleCarForRemove(+free_parking_time, car._id)

                return resolve(car)
            }
        ))
    }

    static async getAllCarsRegisteredByPlaceDashboard(client){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let registered_cars = await CarModel.find({
                    registeration_source_id: client,
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

    static loginPlace(id, access_code){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let place = await PlaceProfileModel.findOne({
                    _id: id
                })

                if(!place){
                    let place_profile_not_found_error = new CustomError('No place profile was found', NOT_FOUND)
                    return reject(place_profile_not_found_error)
                }

                if(place.access_code != access_code){
                    let access_code_not_match = new CustomError('Access code is incorrect', BAD_REQUEST)
                    return reject(access_code_not_match)
                }

                let token = jwt.sign({
                    access_code: access_code,
                    id: id
                }, jwt_secret_key)

                return resolve({
                    token: token,
                    place_profile: place
                })
            }
        ))
    }
}


export default PlaceRepository
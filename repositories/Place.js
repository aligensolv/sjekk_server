import PlaceCollection from "../models/Place.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";
import PlaceProfileModel from "../models/PlaceProfile.js";
import AutosysRepository from "./Autosys.js";
import CarModel from "../models/Car.js";

class PlaceRepository{
    static getAllPlaces(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let places = await PlaceCollection.find().sort({
                    created_at: 'desc'
                }).populate({
                    path: 'parking_provider',
                    ref: 'ParkingProvider'
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
                let generated_link = `http://localhost:5000/clients/${place_profile._id}`
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

    static createCarFromPlaceDashboard(plate_number, configs){
        const free_parking_time = configs.free_parking_time
        const start_date = moment().format('DD.MM.YY HH:mm')
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let created_at = moment().format('DD.MM.YY HH:mm')
                let autosys_car_data = await AutosysRepository.getPlateInformation(plate_number)

                if(!autosys_car_data){
                    let not_found_error = new CustomError('Could not find car data', NOT_FOUND)
                    return reject(not_found_error)
                }

                let car = new CarModel({
                    ...autosys_car_data,
                    start_date: start_date,
                    end_date: moment(start_date, 'DD.MM.YY HH:mm').add(+free_parking_time, 'hours').format('DD.MM.YY HH:mm'),
                    created_at: created_at,
                })

                car.registeration_source = configs.registering_source
                car.registeration_source_id = configs.registering_source_id
                car.free_parking_time = +free_parking_time
                car.registeration_type = 'gateway'

                await car.save()

                return resolve(car)
            }
        ))
    }
}


export default PlaceRepository
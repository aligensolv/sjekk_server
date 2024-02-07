import moment from "moment"
import { INTERNAL_SERVER } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import ParkingProviderModel from "../models/ParkingProvider.js"

class ParkingProviderRepository{
    static getAllParkingProviders(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let parking_providers = await ParkingProviderModel.find({}).populate({
                    path: 'owned_places',
                    ref: 'Place'
                })

                return resolve(parking_providers)
            }
        ))
    }

    static deleteParkingProvider(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                await ParkingProviderModel.findByIdAndDelete(id)

                return resolve(true)
            }
        ))
    }

    static createParkingProvider(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let created_parking_provider = await ParkingProviderModel.create({
                    ...data,
                    created_at: moment().format('DD.MM.YY HH:mm'),
                    owned_places: []
                })
                if(!created_parking_provider){
                    let creating_parking_provider_error = new CustomError('Error Creating parking provider', INTERNAL_SERVER)
                    return reject(creating_parking_provider_error)
                }

                return resolve(created_parking_provider)
            }
        ))
    }
}


export default ParkingProviderRepository
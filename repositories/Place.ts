import { UpdateWriteOpResult } from "mongoose";
import { PlaceInterface, UpdatePlaceInterface } from "../interfaces/place_interface";
import PlaceCollection from "../models/Place"
import CustomError from "../interfaces/custom_error_class";
import { BAD_REQUEST } from "../constants/status_codes";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper";

class PlaceRepository{
    static getAllPlaces(): Promise<PlaceInterface[]>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: PlaceInterface[]) => any) =>{
                let places: PlaceInterface[] = await PlaceCollection.find()
                return resolve(places)
            }
        ))
    }

    static getPlace(id: string): Promise<PlaceInterface>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: PlaceInterface) => any) =>{
                let place: PlaceInterface = await PlaceCollection.findOne({
                    _id: id
                })

                return resolve(place)
            }
        ))
    }

    static createPlace(data: PlaceInterface): Promise<PlaceInterface>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: PlaceInterface) => any) =>{
                let place = await PlaceCollection.create(data)
                return resolve(place)
            }
        ))
    }

    static updatePlace(id: string, data: UpdatePlaceInterface): Promise<boolean>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: boolean) => any) =>{
                let updated: UpdateWriteOpResult = await PlaceCollection.updateOne({
                    _id: id
                }, data)

                return resolve(updated.modifiedCount > 0)
            }
        ))
    }

    static deletePlace(id: string): Promise<boolean>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: boolean) => any) =>{
                let deleted = await PlaceCollection.deleteOne({
                    _id: id
                })
    
                return resolve(deleted.deletedCount > 0)
            }
        ))
    }

    static deleteAllPlaces(): Promise<number>{
        return new Promise(promiseAsyncWrapepr(
            async (resolve: (arg0: number) => any) =>{
                let deleted = await PlaceCollection.deleteMany()
                return resolve(deleted.deletedCount)
            }
        ))
    }
}


export default PlaceRepository
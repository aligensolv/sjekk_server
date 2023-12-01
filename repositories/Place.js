import PlaceCollection from "../models/Place.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";

class PlaceRepository{
    static getAllPlaces(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let places = await PlaceCollection.find()
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
                let place = await PlaceCollection.create(data)
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
}


export default PlaceRepository
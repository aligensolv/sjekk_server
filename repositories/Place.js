import PlaceCollection from "../models/Place.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";

class PlaceRepository{
    static getAllPlaces(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let places = await PlaceCollection.find().sort({
                    created_at: 'desc'
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
                console.log(id);
                let place = await PlaceCollection.findOne({
                    _id: id
                })

                console.log(place);

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
}


export default PlaceRepository
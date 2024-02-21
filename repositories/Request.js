import moment from "moment"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PartnerPlaceCreationRequestModel from "../models/PartnerPlaceCreationRequest.js"
import CustomError from "../interfaces/custom_error_class.js"
import PartnerPlaceDeletionRequestModel from "../models/PartnerPlaceDeletionRequest.js"
import PlaceModel from "../models/Place.js"
import { NOT_CHANGED, NOT_FOUND } from "../constants/status_codes.js"

class RequestRepository{
    static getAllPlaceCreationRequests(){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const requests = await PartnerPlaceCreationRequestModel.find({}).populate({
                    path: 'requested_by',
                    ref: 'Partner'
                })
                return resolve(requests)
            })
        )
    }

    static getAllPlaceCreationRequestsByPartnerId(partner_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const requests = await PartnerPlaceCreationRequestModel.find({
                    requested_by: partner_id
                }).populate({
                    path: 'requested_by',
                    ref: 'Partner'
                })
                return resolve(requests)
            })
        )
    }

    static getAllPlaceDeletionRequests(){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                console.log(' amd here');
                const requests = await PartnerPlaceDeletionRequestModel.find().populate([
                    {
                        path: 'requested_place_id',
                        ref: 'Place'
                    },

                    {
                        path: 'requested_by',
                        ref: 'Partner'
                    }
                ])
                console.log(requests);
                return resolve(requests)
            })
        )
    }

    static getAllPlaceDeletionRequestsByPartnerId(partner_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const requests = await PartnerPlaceDeletionRequestModel.find({
                    requested_by: partner_id
                }).populate([
                    {
                        path: 'requested_place_id',
                        ref: 'Place'
                    },

                    {
                        path: 'requested_by',
                        ref: 'Partner'
                    }
                ])
                return resolve(requests)
            })
        )
    }

    // static getAllPlaceDeletionRequests(){
    //     return new Promise(
    //         promiseAsyncWrapper(async (resolve) => {
    //             const requests = await PartnerPlaceDeletionRequestModel.find({})
    //             return resolve(requests)
    //         })
    //     )
    // }

    // static getAllPlaceDeletionRequestsByPartnerId(partner_id){
    //     return new Promise(
    //         promiseAsyncWrapper(async (resolve) => {
    //             const requests = await PartnerPlaceDeletionRequestModel.find({
    //                 requested_by: partner_id
    //             })
    //             return resolve(requests)
    //         })
    //     )
    // }

    static createPlaceCreationRequest(requested_by,place_creation_details){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                await PartnerPlaceCreationRequestModel.create({
                    requested_by: requested_by,
                    place_creation_details: place_creation_details,
                    created_at: moment().format('DD.MM.YY HH:mm'),
                })
                return resolve(true)
            })
        )
    }

    static createPlaceDeletionRequest(requested_by,requested_place_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                await PartnerPlaceDeletionRequestModel.create({
                    requested_by: requested_by,
                    requested_place_id: requested_place_id,
                    created_at: moment().format('DD.MM.YY HH:mm'),
                })
                return resolve(true)
            })
        )
    }

    static deletePlaceCreationRequest(request_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                let result = await PartnerPlaceCreationRequestModel.deleteOne({
                    _id: request_id
                })

                if(result.deletedCount == 0){
                    const deletion_error = new CustomError('Failed to delete the place request')
                    return reject(deletion_error)
                }
                
                return resolve(true)
            })
        )
    }

    static deletePlaceDeletionRequest(request_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                let result = await PartnerPlaceDeletionRequestModel.deleteOne({
                    _id: request_id
                })

                if(result.deletedCount == 0){
                    const deletion_error = new CustomError('Failed to delete the place request')
                    return reject(deletion_error)
                }
                
                return resolve(true)
            })
        )
    }

    static confirmCreationRequest(request_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                let request = await PartnerPlaceCreationRequestModel.findOne({
                    _id: request_id
                })

                if(!request){
                    let request_not_found = new CustomError('Request Not Found', NOT_FOUND)
                    return reject(request_not_found)
                }

                let result = await PlaceModel.create({
                    location: request.place_creation_details.location,
                    policy: request.place_creation_details.policy,
                    code: request.place_creation_details.code,
                    partner: request.requested_by,
                    created_at: moment().format('DD.MM.YY HH:mm')
                })

                if(result != null){
                    await PartnerPlaceCreationRequestModel.deleteOne({
                        _id: request_id
                    })
                }
                
                return resolve(true)
            })
        )
    }

    static confirmDeletionRequest(request_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                let request = await PartnerPlaceDeletionRequestModel.findOne({
                    _id: request_id
                })

                if(!request){
                    let request_not_found = new CustomError('Request Not Found', NOT_FOUND)
                    return reject(request_not_found)
                }

                let result = await PlaceModel.deleteOne({
                    _id: request.requested_place_id
                })

                if(result.deletedCount == 0){
                    let result_not_deleted = new CustomError('Request was not deleted', NOT_CHANGED)
                    return reject(result_not_deleted)
                }
                
                await PartnerPlaceDeletionRequestModel.deleteOne({
                    _id: request_id
                })
                
                return resolve(true)
            })
        )
    }
}

export default RequestRepository
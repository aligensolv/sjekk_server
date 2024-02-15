import moment from "moment"
import { BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import PartnerModel from "../models/Partner.js"
import PlaceModel from "../models/Place.js"
import jwt from 'jsonwebtoken'
import { jwt_secret_key } from "../config.js"
import CarLogModel from "../models/CarLogs.js"

class PartnerRepository{
    static getAllPartners(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let partners = await PartnerModel.find({}).populate({
                    path: 'owned_places',
                    ref: 'Place'
                })

                return resolve(partners)
            }
        ))
    }

    static getAllPartnerPlaces(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let places = await PlaceModel.find({
                    partner: id
                })

                return resolve(places)
            }
        ))
    }

    static getAllPartnerPlacesCount(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let places_count = await PlaceModel.countDocuments({
                    partner: id
                })

                return resolve(places_count)
            }
        ))
    }

    static loginPartner(id, access_code){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let partner = await PartnerModel.findOne({
                    _id: id
                })

                if(!partner){
                    let partner_not_found_error = new CustomError('No partner was found', NOT_FOUND)
                    return reject(partner_not_found_error)
                }

                if(partner.access_code != access_code){
                    let access_code_not_match = new CustomError('Access code is incorrect', BAD_REQUEST)
                    return reject(access_code_not_match)
                }

                let token = jwt.sign({
                    access_code: access_code,
                    id: id
                }, jwt_secret_key)

                return resolve({
                    token: token,
                    partner: partner
                })
            }
        ))
    }

    static deletePartner(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                await PartnerModel.findByIdAndDelete(id)

                return resolve(true)
            }
        ))
    }

    static createPartner(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let created_partner = await PartnerModel.create({
                    ...data,
                    created_at: moment().format('DD.MM.YY HH:mm'),
                    owned_places: []
                })
                if(!created_partner){
                    let creating_partner_error = new CustomError('Error Creating parking provider', INTERNAL_SERVER)
                    return reject(creating_partner_error)
                }

                return resolve(created_partner)
            }
        ))
    }

    static createPartnerLink(partner_id, access_code){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let partner = await PartnerModel.findOne({
                    _id: partner_id
                })
                if(!partner){
                    let partner_not_found_error = new CustomError('Partner was not found', INTERNAL_SERVER)
                    return reject(partner_not_found_error)
                }

                partner.access_code = access_code
                partner.access_link = `https://partner.gensolv.no/partners/${partner_id}`

                await partner.save()

                return resolve(true)
            }
        ))
    }

    
    static getControlledPlacesTotalRegisteredCars(partner_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let controlled_places = await PlaceModel.find({
                    partner: partner_id
                })

                let registered_cars_count = 0

                for(let place of controlled_places){
                    registered_cars_count += await CarLogModel.countDocuments({
                        'registeration_data.place_id': place._id
                    })
                }

                return resolve(registered_cars_count)
            }
        ))
    }
    
    static getControlledPlacesRegisterationAverageTime(partner_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let controlled_places = await PlaceModel.find({
                    partner: partner_id
                })

                let registered_cars_count = 0

                for(let place of controlled_places){
                    registered_cars_count += await CarLogModel.countDocuments({
                        'registeration_data.place_id': place._id
                    })
                }

                return resolve(registered_cars_count / controlled_places.length)
            }
        ))
    }
}


export default PartnerRepository
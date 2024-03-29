import PlaceRepository from "../repositories/Place.js"
import { BAD_REQUEST, INTERNAL_SERVER, OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import CustomError from "../interfaces/custom_error_class.js"
import PlaceProfileModel from "../models/PlaceProfile.js"

export const getAllPlaces = asyncWrapper(async (req, res, next) => {
    let places = await PlaceRepository.getAllPlaces()
    return res.status(OK).json(places)
})

export const getPlacesCount = asyncWrapper(async (req, res, next) => {
    let count = await PlaceRepository.getPlacesCount()
    return res.status(OK).send(count)
})

export const getPlace = async (req, res) => {
    try{
        const { id } = req.params
        let place = await PlaceRepository.getPlace(id)

        return res.status(OK).json(place)
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}

export const createPlace = asyncWrapper(
    async (req, res) => {
        const data = req.body
        let newPlace = await PlaceRepository.createPlace(data)
    
        return res.status(OK).json(newPlace)
    }
)

export const updatePlace = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let data = req.body
    
        let updated = await PlaceRepository.updatePlace(id,data)
    
        return res.status(OK).json({
            success: updated,
            message: 'Place updated successfully'
        })
    }
)

export const deletePlace = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let deleted = await PlaceRepository.deletePlace(id)
    
        return res.status(OK).json({ 
            success: deleted,
            message: 'Place was deleted successfully'
        })
    }
)

export const deletePlaceProfile = asyncWrapper(
    async (req, res) => {
        const { id, profile_id } = req.params
        let deleted = await PlaceProfileModel.deleteOne({
            place: id,
            _id: profile_id
        })
    
        return res.status(OK).json({ 
            success: deleted,
            message: 'Place was deleted successfully'
        })
    }
)

export const deleteAllPlaces = asyncWrapper(
    async (req, res) => {
        let count = await PlaceRepository.deleteAllPlaces()
    
        return res.status(OK).json({ 
            count: count,
            message: 'All places were deleted successfully'
        })
    }
)

export const createPlaceLink = asyncWrapper(
    async (req, res) => {
        let data = req.body
        const {id} = req.params

        let result = await PlaceRepository.createPlaceLink(id,data)

        return res.status(OK).json(result)
    }
)

export const getAllPlaceProfiles = asyncWrapper(
    async (req, res) => {
        const {id} = req.params

        let result = await PlaceRepository.getAllPlaceProfiles(id)

        return res.status(OK).json(result)
    }
)

export const getPlaceProfile = asyncWrapper(
    async (req, res) => {
        const {client} = req.params

        let result = await PlaceRepository.getPlaceProfile(client)

        return res.status(OK).json(result)
    }
)

export const createCarFromPlaceDashboard = asyncWrapper(
    async (req, res) => {
        const {client} = req.params
        console.log(req.body);
        const {
            plate_number
        } = req.body

        let result = await PlaceRepository.createCarFromPlaceDashboard(plate_number,{
            registeration_source_id: client,
            client: client
        })

        return res.status(OK).json(result)
    }
)

export const getAllCarsRegisteredByPlaceDashboard = asyncWrapper(
    async (req, res) => {
        const {client} = req.params

        let result = await PlaceRepository.getAllCarsRegisteredByPlaceDashboard(client)

        return res.status(OK).json(result)
    }
)

export const loginPlace = asyncWrapper(
    async (req,res,next) => {
        const {id} = req.params
        const {access_code} = req.body

        if(!access_code){
            let access_code_not_provided = new CustomError('Access code not provided', BAD_REQUEST)
            return next(access_code_not_provided)
        }

        let result = await PlaceRepository.loginPlace(id,access_code)
        return res.status(OK).json(result)
    }
)
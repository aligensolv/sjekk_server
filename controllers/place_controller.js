import PlaceRepository from "../repositories/Place.js"
import { INTERNAL_SERVER, OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"

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
        
    }
)
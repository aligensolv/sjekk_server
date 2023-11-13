import { NextFunction, Request, Response } from "express"
import PlaceRepository from "../repositories/Place"
import { INTERNAL_SERVER, OK } from "../constants/status_codes"
import { PlaceInterface, UpdatePlaceInterface } from "../interfaces/place_interface"
import { identifier } from "../constants/custom_types"
import CustomError from "../interfaces/custom_error_class"
import asyncWrapper from "../middlewares/async_wrapper"

export const getAllPlaces = asyncWrapper(async (req: Request, res: Response, next:NextFunction) => {
    let places = await PlaceRepository.getAllPlaces()
    return res.status(OK).json(places)
})
export const getPlace = async (req: Request<identifier>, res: Response) => {
    try{
        const { id } = req.params
        let place: PlaceInterface = await PlaceRepository.getPlace(id)

        return res.status(OK).json(place)
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}

export const createPlace = async (req: Request, res: Response) => {
    try{
        const data: PlaceInterface = req.body
        let newPlace = await PlaceRepository.createPlace(data)

        return res.status(OK).json(newPlace)
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}
export const updatePlace = async (req: Request<identifier>, res: Response) => {
    try{
        const { id } = req.params
        let data: UpdatePlaceInterface = req.body

        let updated: boolean = await PlaceRepository.updatePlace(id,data)

        return res.status(OK).json({
            success: updated,
            message: 'Place updated successfully'
        })
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}

export const deletePlace = async (req: Request<identifier>, res: Response) => {
    try{
        const { id } = req.params
        let deleted: boolean = await PlaceRepository.deletePlace(id)

        return res.status(OK).json({ 
            success: deleted,
            message: 'Place was deleted successfully'
        })
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}

export const deleteAllPlaces = async (req: Request, res: Response) => {
    try{
        let count: number = await PlaceRepository.deleteAllPlaces()

        return res.status(OK).json({ 
            count: count,
            message: 'All places were deleted successfully'
        })
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import RequestRepository from "../repositories/Request.js"

export const getAllPlaceCreationRequests = asyncWrapper(
    async (req,res) => {
        const {partner_id} = req.query
        if(partner_id != undefined) {
            const requests = await RequestRepository.getAllPlaceCreationRequestsByPartnerId(partner_id)
            return res.status(OK).json(requests)
        }

        const requests = await RequestRepository.getAllPlaceCreationRequests()
        return res.status(OK).json(requests)
    }
)

export const createPlaceCreationRequest = asyncWrapper(
    async (req,res) => {
        const {
            place_creation_details,
            requested_by
        } = req.body

        await RequestRepository.createPlaceCreationRequest(requested_by,place_creation_details)
        return res.status(OK).json(true)
    }
)

export const createPlaceDeletionRequest = asyncWrapper(
    async (req,res) => {
        const {
            requested_place_id,
            requested_by
        } = req.body

        console.log(req.body);

        await RequestRepository.createPlaceDeletionRequest(requested_by,requested_place_id)
        return res.status(OK).json(true)
    }
)

export const deletePlaceCreationRequest = asyncWrapper(
    async (req,res) => {
        const {
            id
        } = req.params

        await RequestRepository.deletePlaceCreationRequest(id)
        return res.status(OK).json(true)
    }
)

export const deletePlaceDeletionRequest = asyncWrapper(
    async (req,res) => {
        const {
            id
        } = req.params

        await RequestRepository.deletePlaceDeletionRequest(id)
        return res.status(OK).json(true)
    }
)

export const getAllPlaceDeletionRequests = asyncWrapper(
    async (req,res) => {
        const {partner_id} = req.query
        if(partner_id != undefined) {
            const requests = await RequestRepository.getAllPlaceDeletionRequestsByPartnerId(partner_id)
            return res.status(OK).json(requests)
        }

        const requests = await RequestRepository.getAllPlaceDeletionRequests()
        return res.status(OK).json(requests)
    }
)

export const confirmCreationRequest = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        const result = await RequestRepository.confirmCreationRequest(id)
        return res.status(OK).json(result)
    }
)

export const confirmDeletionRequest = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        const result = await RequestRepository.confirmDeletionRequest(id)
        return res.status(OK).json(result)
    }
)
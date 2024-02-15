import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import PartnerRepository from "../repositories/Partner.js";

export const getAllPartners = asyncWrapper(
    async (req,res) => {
        let partners = await PartnerRepository.getAllPartners()
        return res.status(OK).json(partners)
    }
)

export const getAllPartnerPlaces = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let controlled_places = await PartnerRepository.getAllPartnerPlaces(id)
        return res.status(OK).json(controlled_places)
    }
)

export const getAllPartnerPlacesCount = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let controlled_places_count = await PartnerRepository.getAllPartnerPlacesCount(id)
        return res.status(OK).json(controlled_places_count)
    }
)

export const loginPartner = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const {access_code} = req.body

        let result = await PartnerRepository.loginPartner(id,access_code)
        return res.status(OK).json(result)
    }
)

export const createPartner = asyncWrapper(
    async (req,res) => {
        const data = req.body
        let result = await PartnerRepository.createPartner(data)
        return res.status(OK).json(result)
    }
)

export const deletePartner = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let result = await PartnerRepository.deletePartner(id)
        return res.status(OK).json(result)
    }
)

export const createPartnerLink = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const {access_code} = req.body
        let result = await PartnerRepository.createPartnerLink(id, access_code)
        return res.status(OK).json(result)
    }
)

export const getControlledPlacesTotalRegisteredCars = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let controlled_places_registerations_count = await PartnerRepository.getControlledPlacesTotalRegisteredCars(id)
        return res.status(OK).json(controlled_places_registerations_count)
    }
)

export const getControlledPlacesRegisterationAverageTime = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let controlled_places_registerations_average = await PartnerRepository.getControlledPlacesRegisterationAverageTime(id)
        return res.status(OK).json(controlled_places_registerations_average)
    }
)
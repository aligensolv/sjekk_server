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
        const {id: partner_id} = req.params
        let controlled_places = await PartnerRepository.getAllPartnerPlaces({ partner_id })
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

export const createPartner = asyncWrapper(
    async (req,res) => {
        const { name, email, city, postal_code, address, other_address, fax_number, phone_number } = req.body
        let result = await PartnerRepository.createPartner({ name, email, city, postal_code, address, other_address, fax_number, phone_number })
        return res.status(OK).json(result)
    }
)

export const deletePartner = asyncWrapper(
    async (req,res) => {
        const {id: partner_id} = req.params
        let result = await PartnerRepository.deletePartner({ partner_id })
        return res.status(OK).json(result)
    }
)

export const createPartnerDashboard = asyncWrapper(
    async (req,res) => {
        const { id: partner_id } = req.params
        const { access_username, access_code } = req.body
        const result = await PartnerRepository.createPartnerDashboard({ partner_id, access_username, access_code })
        return res.status(OK).json(result)
    }
)
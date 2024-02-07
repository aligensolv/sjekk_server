import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ParkingProviderRepository from "../repositories/ParkingProvider.js";

export const getAllParkingProviders = asyncWrapper(
    async (req,res) => {
        let parkingProviders = await ParkingProviderRepository.getAllParkingProviders()
        return res.status(OK).json(parkingProviders)
    }
)

export const createParkingProvider = asyncWrapper(
    async (req,res) => {
        const data = req.body
        let result = await ParkingProviderRepository.createParkingProvider(data)
        return res.status(OK).json(result)
    }
)

export const deleteParkingProvider = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let result = await ParkingProviderRepository.deleteParkingProvider(id)
        return res.status(OK).json(result)
    }
)
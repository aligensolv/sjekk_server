import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ResidentialPlaceRepository from "../repositories/ResidentialQuarter.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllResidentialQuarters = asyncWrapper(
    async (req, res) => {
        const result = await ResidentialPlaceRepository.getAllResidentialQuarters()
        return res.status(OK).json(result)
    }
)


export const createResidentialQuarter = asyncWrapper(
    async (req, res) => {
        const { location, policy, code } = req.body

        await ValidatorRepository.validateNotNull({ location, policy, code })

        const result = await ResidentialPlaceRepository.createResidentialQuarter({ location, policy, code })
        return res.status(OK).json(result)
    }
)
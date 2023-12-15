import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import TypeRepository from "../repositories/Type.js";

export const getAllCarTypes = asyncWrapper(
    async (req,res) => {
        const carTypes = await TypeRepository.getAllCarTypes()
        return res.status(OK).json(carTypes)
    }
)

export const createCarType = asyncWrapper(
    async (req,res) => {
        const {type} = req.body
        const newCarType = await TypeRepository.createCarType(type)
        return res.status(OK).send(newCarType)
    }
)


export const deleteCarType = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await TypeRepository.deleteCarType(id)

        return res.status(OK).send(result)
    }
)
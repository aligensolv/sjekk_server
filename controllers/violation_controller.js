import { jwt_secret_key } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ViolationRepository from "../repositories/Violation.js"
import jwt from 'jsonwebtoken'

export const getAllviolations = asyncWrapper(
    async (req,res) =>{
        let violations = await ViolationRepository.getAllViolations()
        return res.status(OK).json(violations)
    }
)

export const getAllPlaceviolations = asyncWrapper(
    async (req,res) =>{
        const {id} = req.params

        let violations = await ViolationRepository.getAllPlaceViolations(id)
        return res.status(OK).json(violations)
    }
)

export const getViolation = asyncWrapper(
    async (req,res) =>{
        const { id } = req.params
        let violation = await ViolationRepository.getViolation(id)
        return res.status(OK).json(violation)
    }
)

export const getCompletedViolations = asyncWrapper(
    async (req,res) =>{
        let completedViolations = await ViolationRepository.getCompletedViolations()
        return res.status(OK).json(completedViolations)
    }
)

export const getSavedViolations = asyncWrapper(
    async (req,res) =>{
        let savedViolations = await ViolationRepository.getSavedViolations()
        return res.status(OK).json(savedViolations)
    }
)

export const createViolation = asyncWrapper(
    async (req,res) =>{
        let data = req.body
        let { token } = req.headers

        let decoded = jwt.verify(token, jwt_secret_key)

        let violation = await ViolationRepository.createViolation({
            ...data,
            user_identifier: decoded._id
        })
        return res.status(OK).json(violation)
    }
)

export const deleteViolation = asyncWrapper(
    async (req,res) =>{
        const {id} = req.params
        let isDeleted = await ViolationRepository.deleteViolation()
        return res.status(OK).send(isDeleted)
    }
)

export const deleteAllViolations = asyncWrapper(
    async (req,res) =>{
        let response = await ViolationRepository.deleteAllViolations()
        return res.status(OK).send(response)
    }
)
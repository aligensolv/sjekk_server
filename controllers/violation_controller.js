import { jwt_secret_key, static_absolute_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ViolationRepository from "../repositories/Violation.js"
import jwt from 'jsonwebtoken'
import logger from "../utils/logger.js"

export const getAllviolations = asyncWrapper(
    async (req,res) =>{
        let violations = await ViolationRepository.getAllViolations()
        return res.status(OK).json(violations)
    }
)

export const getViolationsCount = asyncWrapper(
    async (req,res) =>{
        let count = await ViolationRepository.getViolationsCount()
        return res.status(OK).send(count)
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
        const {token} = req.headers
        let decoded = jwt.verify(token, jwt_secret_key)
        let completedViolations = await ViolationRepository.getCompletedViolations(decoded.id)
        return res.status(OK).json(completedViolations)
    }
)

export const getSavedViolations = asyncWrapper(
    async (req,res) =>{
        const {token} = req.headers
        let decoded = jwt.verify(token, jwt_secret_key)
        let savedViolations = await ViolationRepository.getSavedViolations(decoded.id)
        return res.status(OK).json(savedViolations)
    }
)

export const createViolation = asyncWrapper(
    async (req,res) =>{
        let pre_data = req.body
        let { token } = req.headers


        let plate_info = JSON.parse(pre_data.plate_info)
        let registered_car_info = JSON.parse(pre_data.registered_car_info)
        let rules = JSON.parse(pre_data.rules)
        let is_car_registered = pre_data.is_car_registered == "true"

        const data = {
            ...pre_data,
            plate_info,
            registered_car_info,
            rules,
            is_car_registered
        }

        console.log(data);
        

        let decoded = jwt.verify(token, jwt_secret_key)

        const images = [];

        for (const image of req.files) {
            images.push(static_absolute_files_host + image.path);
        }

        let violation = await ViolationRepository.createViolation({
            ...data,
            publisher_identifier: decoded.id,
            rules: data.rules,
            images: images
        })
        return res.status(OK).json(violation)
    }
)

export const deleteViolation = asyncWrapper(
    async (req,res) =>{
        const {id} = req.params
        let isDeleted = await ViolationRepository.deleteViolation(id)
        return res.status(OK).send(isDeleted)
    }
)

export const deleteAllViolations = asyncWrapper(
    async (req,res) =>{
        let response = await ViolationRepository.deleteAllViolations()
        return res.status(OK).send(response)
    }
)

export const completeViolation = asyncWrapper(
    async (req,res) =>{
        const {id} = req.params

        let response = await ViolationRepository.completeViolation(id)
        return res.status(OK).send(response)
    }
)

export const updateViolation = asyncWrapper(
    async (req,res) =>{
        const {id} = req.params
        const data = req.body

        let response = await ViolationRepository.updateViolation(id,data)
        return res.status(OK).send(response)
    }
)

export const addImage = asyncWrapper(
    async (req, res) =>{
        const {id} = req.params
        const image = static_absolute_files_host + req.file.path
        let response = await ViolationRepository.addImage(id, image)
        return res.status(OK).send(response)
    }
)

export const addRule = asyncWrapper(
    async (req, res) =>{
        const {id} = req.params
        const {rule} = req.body


        let response = await ViolationRepository.addRule(id, rule)
        return res.status(OK).json(response)
    }
)
export const updateInnerComment = asyncWrapper(
    async (req, res) =>{
        const {id} = req.params
        const {comment} = req.body


        let response = await ViolationRepository.updateInnerComment(id, comment)
        return res.status(OK).send(response)
    }
)
export const updateOutterComment = asyncWrapper(
    async (req, res) =>{
        const {id} = req.params
        const {comment} = req.body


        let response = await ViolationRepository.updateOutterComment(id, comment)
        return res.status(OK).send(response)
    }
)
import { jwt_secret_key, static_absolute_files_host, static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ViolationRepository from "../repositories/Violation.js"
import jwt from 'jsonwebtoken'
import logger from "../utils/logger.js"
import ViolationHelperRepository from "../repositories/ViolationHelper.js"

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
        const {date} = req.headers

        let violations = await ViolationRepository.getAllPlaceViolations(id, date)
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
            is_car_registered,
        }

        

        let decoded = jwt.verify(token, jwt_secret_key)

        const images = [];

        for (const image of req.files) {
            const proccessed_image = await ViolationHelperRepository.addDateWatermarkToImage(
                './public/images/temp_cars/' + image.originalname,
                image.originalname,
                image.fieldname
            )

            images.push({
                path: static_files_host + proccessed_image,
                date: image.fieldname,
                localPath: './public/images/temp_cars/' + image.originalname,
                originalName: image.originalname
            });
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


// export const updateViolation = asyncWrapper(
//     async (req,res) =>{
//         const {id} = req.params
//         const data = req.body

//         let response = await ViolationRepository.updateViolation(id,data)
//         return res.status(OK).send(response)
//     }
// )

export const addImage = asyncWrapper(
    async (req, res) =>{
        const {id} = req.params
        console.log(req.file);
        const proccessed_image = await ViolationHelperRepository.addDateWatermarkToImage(
            './public/images/temp_cars/' + req.file.originalname,
            req.file.originalname,
            moment()
        )

        const image = {
            path: static_files_host + proccessed_image,
            date: moment(),
            localPath: './public/images/temp_cars/' + req.file.originalname,
            originalName: req.file.originalname
        }
        await ViolationRepository.addImage(id, image)
        return res.status(OK).send(static_files_host + proccessed_image)
    }
)

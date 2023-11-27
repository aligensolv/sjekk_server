import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import CarRepository from "../repositories/Car.js";

export const getAllCars = asyncWrapper(
    async (req,res) => {
        let cars = await CarRepository.getAllCars();
        return res.status(OK).json(cars);
    }
)

export const getAllCarsByPlace = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        let cars = await CarRepository.getAllCarsByPlace(id);
        return res.status(OK).json(cars);
    }
)

export const getCar = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let car = await CarRepository.getCar(id)
        return res.status(OK).json(car)
    }
)

export const getCarByPlate = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let car = await CarRepository.getCarByPlate(id)
        return res.status(OK).json(car)
    }
)

export const createCar = asyncWrapper(
    async (req,res) => {
        const data = req.body
        let car = await CarRepository.createCar(data)
        return res.status(OK).json(car)
    }
)

export const updateCar = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body

        let update_result = await CarRepository.updateCar(id, data)
        return res.status(OK).json(update_result)
    }
)

export const deleteCar = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let delete_result = await CarRepository.deleteCar(id)
        return res.status(OK).json(delete_result)
    }
)

export const deleteAllCars = asyncWrapper(
    async (req,res) => {
        await CarRepository.deleteAllCars()
        return res.status(OK).json(true)
    }
)
import { Router } from "express";
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";
import CarRepository from "../../repositories/Car.js";
import { OK } from "../../constants/status_codes.js";

const router = Router()

router.get('/cars', uiAsyncWrapper(
    async (req, res) => {
        let cars = await CarRepository.getAllCars();
        return res.status(OK).render('cars/read',{
            cars: cars
        })
    }
))

router.get('/cars/create', uiAsyncWrapper(
    async (req, res) => {
        return res.status(OK).render('cars/create')
    }
))

router.get('/cars/:id/update', uiAsyncWrapper(
    async (req, res) => {
        const {id} = req.params
        let car = await CarRepository.getCar(id)
        return res.status(OK).render('cars/update', {
            car: car
        })
    }
))

export default router
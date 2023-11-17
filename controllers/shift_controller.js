import { jwt_secret_key } from "../config.js";
import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ShiftRepository from "../repositories/Shift.js";
import jwt from 'jsonwebtoken'

export const getAllShifts = asyncWrapper(
    async (req,res) =>{
        let shifts = await ShiftRepository.getAllShifts()
        return res.status(OK).json(shifts)
    }
)

export const getAllTodayShifts = asyncWrapper(
    async (req,res) =>{
        let shifts = await ShiftRepository.getAllTodayShifts();
        return res.status(OK).json(shifts)
    }
)

export const getShiftsByDate = asyncWrapper(
    async (req,res) =>{
        let { date } = req.body
        let shifts = await ShiftRepository.getShiftsByDate(date)
        return res.status(OK).json(shifts)
    }
)

export const getUserShifts = asyncWrapper(
    async (req,res) =>{
        const { id } = req.params
        let shifts = await ShiftRepository.getUserShifts(id)
        return res.status(OK).json(shifts)
    }
)

export const createShift = asyncWrapper(
    async (req,res) =>{
        let { token } = req.headers
        let decoded = jwt.verify(token,jwt_secret_key)
        console.log('shift is');
        console.log(decoded);
        
        let shift = await ShiftRepository.createShift(decoded.id)
        return res.status(OK).json(shift)
    }
)

export const endShift = asyncWrapper(
    async (req,res) =>{
        const { id } = req.params
        await ShiftRepository.endShift(id)
        return res.status(OK).json({
            message: 'shift was ended'
        })
    }
)
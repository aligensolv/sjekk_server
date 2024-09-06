import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ResidentialDashboardRepository from "../repositories/ResidentialDashboard.js";
import ValidatorRepository from "../repositories/Validator.js";

export const createResidentialDashboard = asyncWrapper(
    async (req,res) => {
        const { access_username, access_code, residential_quarter_id, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment } = req.body
        
        await ValidatorRepository.validateNotNull({ 
            access_username, access_code, residential_quarter_id, max_cars_registrations, quarter_name , guest_parking_hours, max_cars_by_apartment
        })

        
        const result = await ResidentialDashboardRepository.createResidentialDashboard({
            access_username, access_code, residential_quarter_id, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment
        })
        return res.status(OK).json(result)
    }
)

export const loginResidentialDashboard = asyncWrapper(
    async (req,res) => {
        const { access_username, access_code } = req.body

        await ValidatorRepository.validateNotNull({ access_username, access_code })

        const result = await ResidentialDashboardRepository.loginResidentialDashboard({ access_username, access_code })
        return res.status(OK).json(result)
    }
)
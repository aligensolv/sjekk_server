import { Router } from "express"
import { createResidentialQuarter, getAllResidentialQuarters } from "../controllers/residential_controller.js"
import { getResidentialCarsByQuarter } from "../controllers/residential_car_controller.js"

const router = Router()

router.get('/residential-quarters', getAllResidentialQuarters)
router.post('/residential-quarters', createResidentialQuarter)


export default router
import { Router } from "express"

import { createApartment, getAllApartments } from "../controllers/apartment_controller.js"

const router = Router()

router.get('/apartments', getAllApartments)
router.post('/apartments', createApartment)

export default router
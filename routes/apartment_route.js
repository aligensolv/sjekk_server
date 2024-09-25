import { Router } from "express"

import { changeApartmentPassword, createApartment, getAllApartments } from "../controllers/apartment_controller.js"

const router = Router()

router.get('/apartments', getAllApartments)
router.post('/apartments', createApartment)

router.put('/apartments/:id/password', changeApartmentPassword)

export default router
import { Router } from "express"

import { createNormalPlace, getAllNormalPlaces } from "../controllers/normal_place_controller.js"

const router = Router()

router.get('/normal-places', getAllNormalPlaces)
router.post('/normal-places', createNormalPlace)

export default router
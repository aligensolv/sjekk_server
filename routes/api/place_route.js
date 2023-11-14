import { Router } from 'express'
import { createPlace, deleteAllPlaces, deletePlace, getAllPlaces, getPlace, updatePlace } from "../../controllers/place_controller.js"

const router = Router();

router.get('/places', getAllPlaces)
router.get('/places/:id', getPlace)

router.post('/places', createPlace)

router.delete('/places/:id', deletePlace)
router.delete('/places', deleteAllPlaces)

router.put('/places/:id', updatePlace)

export default router
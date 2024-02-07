import { Router } from "express"
import { createParkingProvider, deleteParkingProvider, getAllParkingProviders } from "../controllers/parking_provider_controller.js"

const router = Router()

router.get('/parking-providers', getAllParkingProviders)
router.post('/parking-providers', createParkingProvider)
router.delete('/parking-providers/:id', deleteParkingProvider)

export default router
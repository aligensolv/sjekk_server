import { Router } from "express"
import { 
    confirmCreationRequest,
    confirmDeletionRequest,
    createPlaceCreationRequest, 
    createPlaceDeletionRequest, 
    deletePlaceCreationRequest, 
    deletePlaceDeletionRequest, 
    getAllPlaceCreationRequests, 
    getAllPlaceDeletionRequests
} from "../controllers/requests_controller.js"

const router = Router()

router.get('/requests/places/creation', getAllPlaceCreationRequests)
router.post('/requests/places/creation', createPlaceCreationRequest)
router.post('/requests/places/creation/:id/confirm', confirmCreationRequest)
router.delete('/requests/places/creation/:id', deletePlaceCreationRequest)

router.get('/requests/places/deletion', getAllPlaceDeletionRequests)
router.post('/requests/places/deletion', createPlaceDeletionRequest)
router.post('/requests/places/deletion/:id/confirm', confirmDeletionRequest)
router.delete('/requests/places/deletion/:id', deletePlaceDeletionRequest)

export default router
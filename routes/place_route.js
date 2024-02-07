import { Router } from 'express'
import { 
    createCarFromPlaceDashboard,
    createPlace, 
    createPlaceLink, 
    deleteAllPlaces, 
    deletePlace, 
    getAllPlaceProfiles, 
    getAllPlaces, 
    getPlace, 
    getPlaceProfile, 
    getPlacesCount, 
    updatePlace 
} from "../controllers/place_controller.js"

const router = Router();

router.get('/places', getAllPlaces)
router.get('/places/count', getPlacesCount)
router.get('/places/:id', getPlace)

router.post('/places', createPlace)
router.post('/places/:id/create-profile-link', createPlaceLink)
router.get('/places/:id/profiles', getAllPlaceProfiles)
router.get('/places/clients/:client', getPlaceProfile)
router.post('/places/clients/:client/cars', createCarFromPlaceDashboard)

router.delete('/places/:id', deletePlace)
router.delete('/places', deleteAllPlaces)

router.put('/places/:id', updatePlace)

export default router
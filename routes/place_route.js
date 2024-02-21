import { Router } from 'express'
import { 
    createCarFromPlaceDashboard,
    createPlace, 
    createPlaceLink, 
    deleteAllPlaces, 
    deletePlace, 
    deletePlaceProfile, 
    getAllCarsRegisteredByPlaceDashboard, 
    getAllPlaceProfiles, 
    getAllPlaces, 
    getPlace, 
    getPlaceProfile, 
    getPlacesCount, 
    loginPlace, 
    updatePlace 
} from "../controllers/place_controller.js"

const router = Router();

router.get('/places', getAllPlaces)
router.get('/places/count', getPlacesCount)
router.get('/places/:id', getPlace)
router.post('/places/:id/login', loginPlace)


router.post('/places', createPlace)
router.post('/places/:id/create-profile-link', createPlaceLink)
router.get('/places/:id/profiles', getAllPlaceProfiles)
router.get('/places/clients/:client', getPlaceProfile)
router.post('/places/clients/:client/cars', createCarFromPlaceDashboard)
router.get('/places/clients/:client/cars', getAllCarsRegisteredByPlaceDashboard)

router.delete('/places/:id/profiles/:profile_id', deletePlaceProfile)
router.delete('/places/:id', deletePlace)
router.delete('/places', deleteAllPlaces)

router.put('/places/:id', updatePlace)

export default router
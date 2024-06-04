import { Router } from 'express'
import { 
    createCarFromPlaceDashboard,
    createPlace, 
    createPlaceDashboard, 
    deleteAllPlaces, 
    deletePlace, 
    deletePlaceDashboard, 
    getAllCarsRegisteredByPlaceDashboard, 
    getAllPlaceDashboards, 
    getAllPlaces, 
    getPlace, 
    getPlacesCount, 
    updatePlace 
} from "../controllers/place_controller.js"
import { getAllPlaceviolations } from '../controllers/violation_controller.js';

const router = Router();

router.get('/places', getAllPlaces)
router.get('/places/count', getPlacesCount)
router.get('/places/:id', getPlace)


router.post('/places', createPlace)
router.post('/places/:id/dashboards', createPlaceDashboard)
router.get('/places/:id/dashboards', getAllPlaceDashboards)
router.post('/places/dashboards/:id/cars', createCarFromPlaceDashboard)
router.get('/places/dashboards/:id/cars', getAllCarsRegisteredByPlaceDashboard)

router.delete('/places/:id/dashboards/:dashboard_id', deletePlaceDashboard)
router.delete('/places/:id', deletePlace)
router.delete('/places', deleteAllPlaces)

router.put('/places/:id', updatePlace)


router.get('/places/:id/violations', getAllPlaceviolations)

export default router
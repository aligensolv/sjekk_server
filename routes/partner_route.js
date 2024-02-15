import { Router } from "express"
import { 
    createPartner, 
    createPartnerLink, 
    deletePartner, 
    getAllPartnerPlaces, 
    getAllPartnerPlacesCount, 
    getAllPartners, 
    getControlledPlacesRegisterationAverageTime, 
    getControlledPlacesTotalRegisteredCars, 
    loginPartner 
} from "../controllers/partner_controller.js"

const router = Router()

router.get('/partners', getAllPartners)

router.get('/partners/:id/places', getAllPartnerPlaces)
router.get('/partners/:id/places/count', getAllPartnerPlacesCount)
router.get('/partners/:id/places/registerations/count', getControlledPlacesTotalRegisteredCars)
router.get('/partners/:id/places/registerations/avg', getControlledPlacesRegisterationAverageTime)

router.post('/partners/:id/login', loginPartner)
router.post('/partners', createPartner)
router.delete('/partners/:id', deletePartner)
router.post('/partners/:id/link', createPartnerLink)

export default router
import { Router } from 'express'
import {
    getAllviolations,
    getViolation,
    createViolation,
    deleteViolation,
    deleteAllViolations,
    getCompletedViolations,
    getSavedViolations,
    getAllPlaceviolations
} from '../../controllers/violation_controller.js'

const router = Router()

router.get('/violations', getAllviolations)
router.get('/violations/place/:id', getAllPlaceviolations)

router.get('/violations/completed', getCompletedViolations)
router.get('/violations/saved', getSavedViolations)


router.get('/violations/:id', getViolation)



router.post('/violations', createViolation)
router.delete('/violations/:id', deleteViolation)
router.delete('/violations', deleteAllViolations)

export default router
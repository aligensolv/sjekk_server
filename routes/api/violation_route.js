import { Router } from 'express'
import {
    getAllviolations,
    getViolation,
    createViolation,
    deleteViolation,
    deleteAllViolations,
    getCompletedViolations,
    getSavedViolations,
    getAllPlaceviolations,
    completeViolation,
    updateViolation,
    addImage,
    addRule,
    updateInnerComment,
    updateOutterComment,
    getViolationsCount
} from '../../controllers/violation_controller.js'

import multer from 'multer'
import moment from 'moment';

// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be saved
        cb(null, 'public/images/cars/'); // Create a folder named 'uploads' in your project root
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('YYYY-MM-DD') + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = Router()

router.get('/violations', getAllviolations)
router.get('/violations/count', getViolationsCount)
router.get('/violations/place/:id', getAllPlaceviolations)

router.get('/violations/completed', getCompletedViolations)
router.get('/violations/saved', getSavedViolations)


router.get('/violations/:id', getViolation)

router.put('/violations/:id/complete', completeViolation)
router.put('/violations/:id', updateViolation)

router.put('/violations/:id/images',upload.single('image'), addImage)
router.put('/violations/:id/rules', addRule)
router.put('/violations/:id/innerComment', updateInnerComment)
router.put('/violations/:id/outterComment', updateOutterComment)

router.post('/violations',upload.any(),createViolation)
router.delete('/violations/:id', deleteViolation)
router.delete('/violations', deleteAllViolations)

export default router
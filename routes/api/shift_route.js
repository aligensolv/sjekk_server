import { Router } from "express";
import { 
    createShift, 
    endShift, 
    getAllShifts, 
    getAllTodayShifts, 
    getShiftsByDate, 
    getUserShifts, 
} from "../../controllers/shift_controller.js";

const router = Router()

router.get('/shifts', getAllShifts)
router.get('/shifts/today/all', getAllTodayShifts)
router.get('/shifts/user/:id', getUserShifts)

router.get('/shifts/date', getShiftsByDate)


router.post('/shifts', createShift)
router.post('/shifts/:id/end',endShift)

export default router
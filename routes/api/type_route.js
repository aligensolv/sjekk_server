import { Router } from "express";
import { createCarType, deleteCarType, getAllCarTypes } from "../../controllers/type_controller.js";

const router = Router();

router.get('/types', getAllCarTypes)
router.post('/types', createCarType)
router.delete('/types/:id', deleteCarType)

export default router
import { Router } from "express"
import { createResidentialDashboard, loginResidentialDashboard } from "../controllers/residential_dashboard_controller.js"

const router = Router()

router.post('/residential-dashboards', createResidentialDashboard)

router.post('/residential-dashboards/login', loginResidentialDashboard)

export default router
import { Router } from "express"
import { login } from "../../controllers/auth_controller"

const router:Router = Router()

router.post('/login', login)

export default router
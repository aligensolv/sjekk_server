import { Router } from 'express'

const router = Router()

import { loginPartner, loginPlace, loginUser, validateToken } from '../controllers/auth_controller.js'

router.post('/auth/partners/login', loginPartner)
router.post('/auth/places/login', loginPlace)
router.post('/auth/users/login', loginUser)

router.post('/auth/validate-token', validateToken)

export default router
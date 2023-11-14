import { Router } from 'express'

import { OK } from "../../constants/status_codes.js";

const router = Router()

router.get('/login', (req, res) => {
    return res.status(OK).render('auth/login')
})


export default router
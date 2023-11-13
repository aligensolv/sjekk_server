import { Request, Response, Router } from "express";
import { OK } from "../../constants/status_codes";

const router = Router()

router.get('/login', (req: Request, res: Response) => {
    return res.status(OK).render('auth/login')
})

export default router
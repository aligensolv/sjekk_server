import { Router } from "express";
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";
import ViolationRepository from "../../repositories/Violation.js"
import { OK } from "../../constants/status_codes.js";


const router = Router();

router.get('/violations', uiAsyncWrapper(
    async (req, res) => {
        let violations = await ViolationRepository.getAllViolations();
        return res.status(OK).render('violations/read', {
            violations: violations
        })
    }
))

router.get('/violations/:id', uiAsyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let violation = await ViolationRepository.getViolation(id)

        return res.status(OK).render('violations/view_violation', {
            violation: violation
        })
    }
))


export default router
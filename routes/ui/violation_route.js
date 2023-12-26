import { Router } from "express";
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";
import ViolationRepository from "../../repositories/Violation.js"
import { OK } from "../../constants/status_codes.js";
import { account_number, iban_numner, kid_number, swift_code } from "../../config.js";
import moment from "moment";


const router = Router();

router.get('/violations', uiAsyncWrapper(
    async (req, res) => {
        let violations = await ViolationRepository.getAllViolations();
        return res.status(OK).render('violations/read', {
            violations: violations,
        })
    }
))

router.get('/violations/report', uiAsyncWrapper(
    async (req, res) => {
        return res.status(OK).render('violations/report')
    }
))

router.get('/violations/:id', uiAsyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let violation = await ViolationRepository.getViolation(id)

        let sum = violation.rules.reduce((total,current) => total + current.charge, 0)

        return res.status(OK).render('violations/view_violation', {
            violation: violation,
            kid_number: kid_number,
            account_number: account_number,
            swift_code: swift_code,
            iban_number: iban_numner,
            total_charge: sum
        })
    }
))


export default router
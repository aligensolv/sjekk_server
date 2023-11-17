import { Router } from "express";
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";
import RuleRepository from "../../repositories/Rule.js";
import { OK } from "../../constants/status_codes.js";

const router = Router()

router.get('/rules', uiAsyncWrapper(
    async (req, res) => {
        let rules = await RuleRepository.getAllRules();
        return res.status(OK).render('rules/read',{
            rules
        })
    }
))

router.get('/rules/:id/update', uiAsyncWrapper(
    async (req, res) => {
        const {id} = req.params
        let rule = await RuleRepository.getRule(id);
        return res.status(OK).render('rules/update',{
            rule
        })
    }
))

router.get('/rules/create', uiAsyncWrapper(
    async (req, res) => {
        return res.status(OK).render('rules/create')
    }
))

export default router
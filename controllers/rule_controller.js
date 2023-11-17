import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import RuleRepository from "../repositories/Rule.js";

export const getAllRules = asyncWrapper(
    async (req,res) => {
        let rules = await RuleRepository.getAllRules();
        return res.status(OK).json(rules);
    }
)

export const getRule = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let rule = await RuleRepository.getRule(id)
        return res.status(OK).json(rule)
    }
)

export const createRule = asyncWrapper(
    async (req,res) => {
        let data = req.body
        let rule = await RuleRepository.createRule(data)
        return res.status(OK).json(rule)
    }
)

export const updateRule = asyncWrapper(
    async (req,res) => {
        let data = req.body
        let {id} = req.params

        let isUpdated = await RuleRepository.updateRule(id,data)
        return res.status(OK).json(isUpdated)
    }
)

export const deleteRule = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let isDeleted = await RuleRepository.deleteRule(id)
        return res.status(OK).json(isDeleted)
    }
)

export const deleteAllRules = asyncWrapper(
    async (req,res) => {
        await RuleRepository.deleteAllRules();
        return res.status(OK).json(true)
    }
)
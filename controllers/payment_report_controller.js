import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import PaymentReportRepository from "../repositories/PaymentReportRepository.js"

export const getPaymentReports = asyncWrapper(
    async (req, res) => {
        const reports = await PaymentReportRepository.getPaymentReports()

        return res.status(OK).json(reports)
    }
)

export const generatePaymentReport = asyncWrapper(
    async (req, res) => {
        const report = await PaymentReportRepository.generatePaymentReport()

        return res.status(OK).json(report)
    }
)
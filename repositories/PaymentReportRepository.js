import puppeteer from "puppeteer"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import { compiledPaymentReportTemplate } from "../config.js"
import CustomError from "../interfaces/custom_error_class.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"

class PaymentReportRepository {
    static prisma = PrismaClientService.instance
    static getPaymentReports = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve) => {
                const reports = await this.prisma.paymentReport.findMany({
                    include: {
                        metadata: true
                    }
                })
                return resolve(reports)
            }
        )
    )

    static async generatePaymentReport() {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const browser = await puppeteer.launch({
                headless: 'true',
                args:['--no-sandbox'],
                defaultViewport:{
                    width: 800,
                    height: 600,
                    deviceScaleFactor: 2
                }
            });
            try{
                const page = await browser.newPage();                
                
            
                const templateData = {}
            
                let parsed = compiledPaymentReportTemplate(templateData)
            

                await page.setContent(parsed, {
                    waitUntil: ['load', 'networkidle0']
                })

                await new Promise((resolve) => setTimeout(resolve, 4000));


                // const container = await page.$('.container')

                const name = `payment_report_${Date.now()}`

                await page.pdf({
                    path: `./public/payment_reports/${name}.pdf`,
                    format: 'A3',
                    displayHeaderFooter: false,
                    printBackground: true,
                    landscape: true,
                })
            
                await browser.close();
                
                return resolve(name)
            }catch(error){
                await browser.close()
                let generate_payment_report_error = new CustomError(
                    error.message,
                    INTERNAL_SERVER
                );

                return reject(generate_payment_report_error)
            }
        }))
    }
}

export default PaymentReportRepository
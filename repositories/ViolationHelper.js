import randomstring from "randomstring";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import puppeteer from "puppeteer"
import Handlebars from "handlebars"
import qr from 'qr-image'
import fs from "fs"
import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import moment from "moment";

import { static_files_host } from "../config.js";

class ViolationHelperRepository{
    static generateTicketNumber(){
        let generated = randomstring.generate({
            length: 7,
            charset: 'numeric'
        })
        return generated
    }

    static generateRandomString(){
        return randomstring.generate(12)
    }

    static generateTicketQRCode(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    try{
                        const data = 'https://klage.gensolv.no' // URL or any data you want to encode
                        const qrCode = qr.image(data, { type: 'png' });
                        let randomstring = this.generateRandomString()
                
                        // Generate a unique filename
                        const filename = `${randomstring}_${moment().format('YYYY.MM.DD')}.png`;
                        const filePath = `public/qrcodes/${filename}`;
                
                        const qrStream = qrCode.pipe(fs.createWriteStream(filePath));
                
                        qrStream.on('finish', () => {
                            console.log(`QR Code saved as ${filename}`);
                        });

                        return resolve(`qrcodes/${filename}`)
                    }catch(err){
                        reject(err.message)
                    }
                }
            )
        )
    }

    static generateTicketImage(name, data = {}){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                const browser = await puppeteer.launch({
                    headless: 'new',
                    args:['--no-sandbox'],
                    defaultViewport:{
                        width: 800,
                        height: 600,
                        deviceScaleFactor: 2
                    }
                });
                try{
                    const page = await browser.newPage();
            
                    let template = fs.readFileSync('app_templates/violation.html', 'utf-8')

                    let qrcode_image = await this.generateTicketQRCode()
                    
                
                
                    const templateData = {
                        ...data,
                        qrcode_image: qrcode_image,
                        host: static_files_host
                    }
                
                    let compiled = Handlebars.compile(template)
                    let parsed = compiled(templateData)
                
                    await page.waitForNetworkIdle()
                    await page.setContent(parsed)
                    const container = await page.$('.container')

                    

                    await container.screenshot({
                        path: `./public/tickets/${name}.jpg`,
                        quality: 100,
                    })
                
                    await browser.close();
                    let path = static_files_host + `tickets/${name}.jpg`

                    return resolve(path)
                }catch(error){
                    await browser.close()
                    let generate_ticket_image_error = new CustomError(
                        error.message,
                        INTERNAL_SERVER
                    );

                    return reject(generate_ticket_image_error)
                }
            }
        ));
    }
}

export default ViolationHelperRepository
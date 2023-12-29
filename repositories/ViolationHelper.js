import randomstring from "randomstring";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import puppeteer from "puppeteer"
import Handlebars from "handlebars"
import qr from 'qr-image'
import fs from "fs"
import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import moment from "moment";
import path from "path"
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { createCanvas, loadImage } from 'canvas'


import { compiledViolationTemplate, static_files_host } from "../config.js";

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
                        const filename = `${randomstring}_${moment().format('DD.MM.YY')}.png`;
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
                    let qrcode_image = await this.generateTicketQRCode()
                    
                    console.log(data.rules);
                
                    const templateData = {
                        ...data,
                        qrcode_image: qrcode_image,
                        host: static_files_host,
                        rules: data.rules.map(r => {
                            if(r.name.includes('-') && r.name.length == 1){
                                r.name = r.name.split('-')[1];
                            }else if(r.name.includes('.')){
                                let parts = r.name.split('.')
                                parts.shift()
                                r.name = parts.join('')
                            }

                            return r
                        })
                    }
                
                    let parsed = compiledViolationTemplate(templateData)
                
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

    static addDateWatermarkToImage(imagePath,originalName, date){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                try {
                    // Load the image using canvas
                    const image = await loadImage(imagePath);
                    console.log('image is loaded successfully');
                    const canvas = createCanvas(image.width, image.height);
                    const ctx = canvas.getContext('2d');
            
                    // Draw the original image
                    ctx.drawImage(image, 0, 0);
            
                    // Set font and color for the timestamp
                    const fontSize = 20;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = 'white';
            
                    // Format the date as a string
                    const dateString = moment(date).format('DD.MM.YY HH:mm');
            
                    // Measure the width of the text to determine the box size
                    const textWidth = ctx.measureText(dateString).width;
                    const boxPadding = 10;
            
                    // Draw a gray box at the bottom right corner
                    ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
                    ctx.fillRect(image.width - textWidth - boxPadding * 2, image.height - fontSize - boxPadding * 2, textWidth + boxPadding * 2, fontSize + boxPadding * 2);
            
                    // Draw the timestamp inside the box
                    ctx.fillStyle = 'white';
                    ctx.fillText(dateString, image.width - textWidth - boxPadding, image.height - boxPadding);
            
                    // Save the modified image
                    const modifiedImagePath = path.join(__dirname, '../','public', 'images', 'cars', originalName)
                    const modifiedImageStream = fs.createWriteStream(modifiedImagePath);
                    const modifiedImageBuffer = canvas.toBuffer('image/jpeg');
                    modifiedImageStream.write(modifiedImageBuffer);
                    modifiedImageStream.end();
            
                    console.log('Date embedded successfully.');
        
                    return resolve('images/cars/' + originalName)
                } catch (error) {
                    console.error('Error embedding date:', error);
                    return reject(error.message)
                }
            }
        ))
    }
}

export default ViolationHelperRepository
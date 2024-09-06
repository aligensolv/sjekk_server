import moment from "moment";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import fs from 'fs'
import qr from 'qr-image'
import { fileURLToPath } from 'url'
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ResidentialDashboardHelper {
    static generateTicketQRCode({residential_quarter_id}){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    try{
                        const data = `https://localhost:5179/quarters/${residential_quarter_id}/apartments/registration` // URL or any data you want to encode
                        const qrCode = qr.image(data, { type: 'png', size: 10 });
                
                        // Generate a unique filename
                        const filename = `${residential_quarter_id}_${moment().format('DD.MM.YY')}.png`;
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
}

export default ResidentialDashboardHelper
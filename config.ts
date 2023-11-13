import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
    path: path.join(__dirname, './.env')
})

export const jwt_secret_key: string|undefined = process.env.JWT_SECRET_KEY
export const port: string|undefined = process.env.PORT
export const host: string|undefined = process.env.HOST
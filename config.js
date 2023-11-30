import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, './.env')
})

export const jwt_secret_key = process.env.JWT_SECRET_KEY.trim()
export const port = process.env.PORT.trim()
export const host = process.env.HOST.trim()
export const node_env = process.env.NODE_ENV.trim()
export const is_development = node_env == 'development'

export const mongodb_connection_string = process.env.MONGODB_CONNECTION
export const static_files_host = process.env.DEV_STATIC_FILES_HOST
export const static_absolute_files_host = process.env.ABSOLUTE_STATIC_FILES_HOST
export const autosys_api_key = process.env.AUTOSYS_API_KEY
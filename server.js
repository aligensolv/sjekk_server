import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port, host } from './config.js'
import { OK } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'
import logger from './utils/logger.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({ origin: '*' })
)

app.use(compression())
app.use('/public',express.static(path.join(__dirname, './public')))


app.set('view engine', 'ejs')

import ValidateApiToken from './middlewares/validate_api_token.js'
import UserRoute from './routes/api/user_route.js'
import AuthRoute from './routes/api/auth_route.js'
import PlaceRoute from './routes/api/place_route.js'
import ViolationApi from './routes/api/violation_route.js'
import ShiftApi from './routes/api/shift_route.js'
import RuleApi from './routes/api/rule_route.js'
import AutosysApi from './routes/api/autosys_route.js'
import BoardApi from './routes/api/board_route.js'


// public routes
app.use(
    '/api',
    AuthRoute,
)

// routes requires a valid api token
app.use(
    '/api',
    // ValidateApiToken,
    UserRoute,
    PlaceRoute,
    ViolationApi,
    ShiftApi,
    RuleApi,
    AutosysApi,
    BoardApi
)

import AuthUi from './routes/ui/auth_route.js'
import UserUi from './routes/ui/user_route.js'
import PlaceUi from './routes/ui/place_route.js'
import RuleUi from './routes/ui/rule_route.js'
import BoardUi from './routes/ui/board_route.js'

app.use(
    AuthUi,
    UserUi,
    PlaceUi,
    RuleUi,
    BoardUi
)


app.get('/',(req, res) => {
    return res.status(OK).render('index')
})

app.use(ErrorHandlerMiddleware)


app.get('*', (req, res) => {
    return res.status(OK).render('errors/404')
})

const main = async () => {
    try{
        let lib = await import('./utils/mongoose_connection.js')
        if(await lib.default){
            app.listen(port, () => console.log(`server listening on ${host}:${port}`))
        }
    }catch(err){
        logger.error(err.message)
    }
}

main()


import './utils/mongoose_connection'

import * as express from 'express'
import { Application, Request, Response } from 'express' 
import * as path from 'path'
import * as compression from 'compression'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { port, host } from './config'
import { OK } from './constants/status_codes'
import ErrorHandlerMiddleware from './middlewares/error_handler'



const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({ origin: '*' })
)

app.use(compression())
app.use(express.static(path.join(__dirname, './public')))


app.set('view engine', 'ejs')

import ValidateApiToken from './middlewares/validate_api_token'
import UserRoute from './routes/api/user_route'
import AuthRoute from './routes/api/auth_route'
import PlaceRoute from './routes/api/place_route'

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
    PlaceRoute
)

import AuthUi from './routes/ui/auth_route'
import UserUi from './routes/ui/user_route'
import PlaceUi from './routes/ui/place_ui'

app.use(
    AuthUi,
    UserUi,
    PlaceUi
)


app.get('/',(req: Request, res: Response) => {
    return res.status(OK).render('index')
})

app.use(ErrorHandlerMiddleware)


app.get('*', (req: Request, res: Response) => {
    return res.status(OK).render('errors/404')
})

app.listen(port, () => console.log(`server listening on ${host}:${port}`))
import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port, host, socket_port } from './config.js'
import { NOT_FOUND, OK } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'
import logger from './utils/logger.js'

import { Server } from 'socket.io'
import http from 'http'

import './utils/cron_jobs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

    const server = http.createServer(app)
    const io = new Server(server,{
        cors: {
            origin: '*'
        }
    })


    app.set('io', io)
/*
    How to use socket in any route

    let io = req.app.get('io');
    io.emit('notification', {
        notification: {
            title: 'now in flutter',
            body: 'some body for notification',
        }
    })
*/



io.on('connection', (socket) => {
    console.log(`a new connection and count is: ${socket.client.conn.server.clientsCount}`)

    
    socket.on('disconnect', () => {
        console.log(`User disconnected and count is: ${socket.client.conn.server.clientsCount}`);
    });
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors()
)

app.use(compression())
app.use('/public',express.static(path.join(__dirname, './public')))



import ValidateApiToken from './middlewares/validate_api_token.js'
import UserRoute from './routes/user_route.js'
import AuthRoute from './routes/auth_route.js'
import PlaceRoute from './routes/place_route.js'
import ViolationApi from './routes/violation_route.js'
import ShiftApi from './routes/shift_route.js'
import RuleApi from './routes/rule_route.js'
import AutosysApi from './routes/autosys_route.js'
import CarApi from './routes/car_route.js'
import ColorApi from './routes/color_route.js'
import TypeApi from './routes/type_route.js'
import BrandApi from './routes/brand_route.js'
import StatisticsApi from './routes/statistics_route.js'
import PartnerApi from './routes/partner_route.js'
import CarLogApi from './routes/car_log_route.js'
import RequestApi from './routes/requests.js'


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
    CarApi,
    ColorApi,
    TypeApi,
    BrandApi,
    StatisticsApi,
    PartnerApi,
    CarLogApi,
    RequestApi
)


app.use(ErrorHandlerMiddleware)


app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        let lib = await import('./utils/mongoose_connection.js')
        if(await lib.default){
            app.listen(port, () => console.log(`server listening on ${host}:${port}`))
            server.listen(socket_port, () => console.log(`server listening on ${host}:${socket_port}`)) 
        }
    }catch(err){
        logger.error(err.message)
    }
}
main()


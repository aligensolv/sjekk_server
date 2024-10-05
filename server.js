import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port, host, compiledApartmentRequestTemplate, compiledApartmentRequestAcceptedTemplate } from './config.js'
import { NOT_FOUND } from './constants/status_codes.js'
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
export const io = new Server(server,{
    cors: {
        origin: '*'
    }
})


app.set('io', io)


io.on('connection', (socket) => {
    console.log(`a new connection and count is: ${socket.client.conn.server.clientsCount}`)

    socket.on('register-residential', (id) => {
        socket.join(id)

        io.to(id).emit('fm-message', {
            message: 'hello from server'
        })
    })

    socket.on('unregister-residential', (id) => {
        socket.leave(id)
    })
    
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
import BrandApi from './routes/brand_route.js'
import StatisticsApi from './routes/statistics_route.js'
import PartnerApi from './routes/partner_route.js'
import CarLogApi from './routes/car_log_route.js'
import RequestApi from './routes/place_requests.js'

import NormalPlaceApi from './routes/normal_place_route.js'
import ResidentialQuarterApi from './routes/residential_place_route.js'
import ApartmentApi from './routes/apartment_route.js'

import ResidentialCarApi from './routes/residential_car_route.js'

import ResidentialDashboardApi from './routes/residential_dashboard_route.js'
import ApartmentRequestApi from './routes/apartment_request_route.js'
import ApartmentLocationRequestApi from './routes/apartment_location_request_route.js'


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
    BrandApi,
    StatisticsApi,
    PartnerApi,
    CarLogApi,
    RequestApi,

    NormalPlaceApi,
    ResidentialQuarterApi,
    ApartmentApi,

    ResidentialCarApi,
    ResidentialDashboardApi,
    ApartmentRequestApi,
    ApartmentLocationRequestApi
)


import Handlebars from 'handlebars'
import { sendAlertMail } from './services/smtp_service.js'

app.get('/test', async (req,res) => {
    // const template = compiledApartmentRequestTemplate({
    //     owner_name: 'John Doe',
    //     username: 'johndoe123',
    //     email: 'john.doe@example.com',
    //     building_number: '12B',
    //     apartment_number: '101',
    //     floor_number: '3',
    //     residential_quarter: 'Sunset Park',
    //   })

    const template = compiledApartmentRequestAcceptedTemplate({
        owner_name: 'Jane Smith',
        username: 'janesmith789',
        email: 'jane.smith@example.com',
        building_number: '24A',
        apartment_number: '205',
        floor_number: '2',
        residential_quarter: 'Maple Grove',
        dashboard_link: 'https://dashboard.parksync.com',
        year: new Date().getFullYear(),
      })

    sendAlertMail({
        subject: 'Apartment accepted',
        text: template,
        to: 'alitarek99944@gmail.com',
        html: template
    })

    return res.status(200).json({
        message: 'success'
    })
})


app.use(ErrorHandlerMiddleware)

app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        server.listen(port, () => console.log(`[server] listening on ${port}`))
    }catch(err){
        logger.error(err.message)
    }
}

main()


import cron from 'node-cron'
import ViolationModel from '../models/Violation.js'

cron.schedule('0 0 0 * * *', async () => {
    await ViolationModel.updateMany({},{
        locked: true
    })
})
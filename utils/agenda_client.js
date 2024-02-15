import Agenda from 'agenda'
import CarModel from '../models/Car.js';
import CarLogModel from '../models/CarLogs.js';
import moment from 'moment';
import { mongodb_connection_string } from '../config.js';
const mongoConnectionString = mongodb_connection_string;
const agenda = new Agenda({ db: { address: mongoConnectionString } });

await agenda.start(); // Start agenda to initiate the connection with the database

agenda.define('schedule_car_deletion', async job => {
    const { carId } = job.attrs.data;
    
    await CarModel.deleteOne({
      _id: carId
    });
});

export const scheduleCarForRemove = async (time, car_id) => {
  await agenda.schedule(`in ${time} hours`, 'schedule_car_deletion', { carId: car_id });
}

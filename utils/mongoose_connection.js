import { connect } from 'mongoose';
import { mongodb_connection_string, mongodb_local_connection } from '../config.js';


export default new Promise(async (resolve, reject) => {
    try{
        await connect(mongodb_local_connection).then(() => console.log('connected to mongodb'))
        return resolve(true) 
    }catch(e){
        return reject (new Error('Connection Error: ' + e.message))
    }
})
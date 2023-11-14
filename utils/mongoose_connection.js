import { connect } from 'mongoose';
const uri = 'mongodb+srv://danaaka8:p6TPp7ILrQUlDKfE@cluster0.uyhqfof.mongodb.net/sjekk'; // Replace with your MongoDB connection URI


export default new Promise(async (resolve, reject) => {
    try{
        await connect(uri).then(() => console.log('connected to mongodb'))
        return resolve(true) 
    }catch(e){
        return reject (new Error('Connection Error: ' + e.message))
    }
})
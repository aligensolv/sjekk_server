const mongoose = require('mongoose')
const uri = 'mongodb+srv://danaaka8:p6TPp7ILrQUlDKfE@cluster0.uyhqfof.mongodb.net/sjekk'; // Replace with your MongoDB connection URI


mongoose.connect(uri).then(() => {
    console.log('connected to mongoose')
})

import * as mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    plate_number:{
        type: String,
        required: true,
    },

    registeration_type:{
        type: String,
        required: true,
    },

    brand:{
        type: String,
        required: true
    },

    plate:{
        type: String,
        required: true
    },

    year:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    start_date:{
        type: String,
        required: true,
    },

    end_date:{
        type: String,
        required: true,
    },

    created_at:{
        type: String,
        required: true,
    }
})

const CarModel = mongoose.model('Car', CarSchema)

export default CarModel
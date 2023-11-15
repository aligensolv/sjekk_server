import * as mongoose from "mongoose";

const ViolationSchema = new mongoose.Schema({
    rule:{
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true,
        enum: ['saved','completed']
    },

    car_data:{
        brand: {
            type: String,
            required: true
        },

        color:{
            type: String,
            required: true
        },

        board_number:{
            type: String,
            required: true
        }
    },

    created_at:{
        type: String,
        required: true,
    },
})

const ViolationModel = mongoose.model('Violation', ViolationSchema)

export default ViolationModel
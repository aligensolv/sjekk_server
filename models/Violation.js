import * as mongoose from "mongoose";

const ViolationSchema = new mongoose.Schema({
    publisher_identifier:{
        type: String,
        required: true
    },

    place:{
        type: String,
        required: true
    },

    locked:{
        type: Boolean,
        false: false
    },

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
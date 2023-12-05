import * as mongoose from "mongoose";

const ViolationSchema = new mongoose.Schema({
    publisher_identifier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    paper_comment:{
        type: String,
        default: ''
    },

    out_comment:{
        type: String,
        default: ''
    },

    images:{
        type: [String],
        default: []
    },

    place:{
        type: String,
        ref: 'Place',
        required: true
    },

    print_paper:{
        type: String,
        default: null
    },

    locked:{
        type: Boolean,
        default: false
    },

    rules:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Rule',
        required: true
    },

    status:{
        type: String,
        required: true,
        enum: ['saved','completed']
    },

    plate_info: {
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
    },

    is_car_registered: {
        type: Boolean,
        required: true
    },
    
    registered_car_info:{
        type: mongoose.Schema.Types.Map,
        default: null
    },

    created_at:{
        type: String,
        required: true,
    },

    completed_at: {
        type: String,
        default: null
    }
})

const ViolationModel = mongoose.model('Violation', ViolationSchema)

export default ViolationModel
import * as mongoose from "mongoose";

const ShiftSchema = new mongoose.Schema({
    start_date:{
        type: String,
        required: true
    },

    end_date:{
        type: String,
        default: null
    },

    user_identifier:{
        type: String,
        required: true
    },

    total_completed_violations:{
        type: Number,
        default: null
    }
})

const ShiftModel = mongoose.model('Shift', ShiftSchema)

export default ShiftModel
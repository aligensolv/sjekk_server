import * as mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    board_number:{
        type: String,
        required: true,
    },

    registeration_type:{
        type: String,
        required: true,
    },

    brand:{
        type: String,
        required: true,
    },

    start_date:{
        type: String,
        required: true,
    },

    end_date:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    created_at:{
        type: String,
        required: true,
    }
})

const BoardModel = mongoose.model('Board', BoardSchema)

export default BoardModel
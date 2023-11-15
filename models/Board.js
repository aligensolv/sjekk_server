import * as mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    board_number:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    created_at:{
        type: String,
    }
})

const BoardModel = mongoose.model('Board', BoardSchema)

export default BoardModel
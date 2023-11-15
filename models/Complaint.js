import * as mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    publisher:{
        type: String,
        required: true
    },

    created_at:{
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    }
})

const ComplaintModel = mongoose.model('Complaint', ComplaintSchema)

export default ComplaintModel
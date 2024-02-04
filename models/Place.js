import * as mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },

    policy:{
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true
    },

    created_at:{
        type: String,
        required: true
    },

    profile_image: {
        type: String,
        default: null
    },

    profile_link: {
        type: String,
        default: null
    }
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

export default PlaceModel
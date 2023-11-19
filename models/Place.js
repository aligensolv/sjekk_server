import * as mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },

    policy:{
        type: String,
        required: true
    }
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

export default PlaceModel
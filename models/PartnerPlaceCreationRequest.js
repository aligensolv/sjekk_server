import * as mongoose from "mongoose";

const PartnerPlaceCreationRequestSchema = new mongoose.Schema({
    requested_by: {
        type: String,
        ref: 'Partner',
        required: true
    },

    place_creation_details: {
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
    },

    created_at: {
        type: String,
        required: true
    },
})

const PartnerPlaceCreationRequestModel = mongoose.model('PartnerPlaceCreationRequest', PartnerPlaceCreationRequestSchema)

export default PartnerPlaceCreationRequestModel
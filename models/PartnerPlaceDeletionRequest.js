import * as mongoose from "mongoose";

const PartnerPlaceDeletionRequestSchema = new mongoose.Schema({
    requested_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },

    requested_place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },

    created_at: {
        type: String,
        required: true
    },    
})

const PartnerPlaceDeletionRequestModel = mongoose.model('PartnerPlaceDeletionRequest', PartnerPlaceDeletionRequestSchema)

export default PartnerPlaceDeletionRequestModel
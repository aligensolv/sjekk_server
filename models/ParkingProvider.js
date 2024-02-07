import mongoose, { Schema } from 'mongoose';

const ParkingProviderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    address: { type: String, required: true },
    other_address: { type: String, required: false },
    fax_number: { type: String, required: false },
    phone_number: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, default: null },
    owned_places: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }]
});

const ParkingProviderModel = mongoose.model('ParkingProvider', ParkingProviderSchema);

export default ParkingProviderModel;

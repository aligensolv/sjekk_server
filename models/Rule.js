import * as mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    charge:{
        type: Number,
        required: true
    },

    policy_time:{
        type: Number,
        required: true
    },

    created_at:{
        type: String,
        required: true,
    },

    updated_at:{
        type: String,
        default: null
    },
})

const RuleModel = mongoose.model('Rule', RuleSchema)

export default RuleModel
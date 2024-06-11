const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true,
        },
        lName: String,
        email: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        consentGiven: {
            type: Boolean,
            default: false
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret.updatedAt;
            },
        },
        timestamps: true,
    }
);

mongoose.models = {}

export default mongoose.model("Consent", consentSchema);

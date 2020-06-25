const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TouristsitesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number]
    }
});

const Touristsite = mongoose.model('Touristsite', TouristsitesSchema);

module.exports = Touristsite;
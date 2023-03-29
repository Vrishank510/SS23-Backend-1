const mongoose = require('mongoose')

const sponsorSchema = mongoose.Schema({
    name: {
        type: String,
    },
    link: {
        type: String,
    },
    type: {
        type: String,
    },
    photo: {
        type: String
    }
});

const Sponsor = mongoose.model('Sponsor', sponsorSchema);
module.exports = Sponsor;
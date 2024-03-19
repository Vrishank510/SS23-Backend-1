const mongoose = require('mongoose')

// Category, Name, Desc, Image, Venue/Time, Link (if any)
const eventSchema = mongoose.Schema({
    name: {
        type: String,
    },
    link: {
        type: String,
    },
    desc: {
        type: String,
    },
    type: {
        type: String,
    },
    photo: {
        type: String
    },
    venue: {
        type: String,
    }
});

const Events = mongoose.model('Events', eventSchema);
module.exports = Events;
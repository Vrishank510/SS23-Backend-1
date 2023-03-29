const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    department: {
        type: String,
    },
    photo: {
        type: String
    }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
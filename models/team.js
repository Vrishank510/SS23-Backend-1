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
const collection = Team.collection;

Team.findTeams = async function () {
    return await collection.findOne({ name: 'allTeamsList' })
        .then(x => x.teams);
}

module.exports = Team;

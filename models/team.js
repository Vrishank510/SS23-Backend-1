const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
    name:{
        type: String,
    },
    rollno:{
        type: String,
    },
    department:{
        type: String,
    },
    year:{
        type: String,
    },
    phone:{
        type: String,
    },
    mail:{
        type: String,
    }
})

const teamSchema = mongoose.Schema({
    name: {
        type: String,
    },
    chairman:{
        type: String,
    },
    members:{
        type:[memberSchema],
    }
});

const Team = mongoose.model('Team', teamSchema);
// const collection = Team.collection;

// Team.findTeams = async function () {
//     return await collection.findOne({ name: 'allTeamsList' })
//         .then(x => x.teams);
// }

module.exports = Team;

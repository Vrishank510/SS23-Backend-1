const mongoose = require("mongoose")

const OauthUserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    profilePicture: {type: String, required: false},
    id: {type: String}
})

module.exports = mongoose.model("OauthUser", OauthUserSchema)

const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likedSongs: {
        type: String,
        default: ""
    },
    likedPlaylist: {
        type: String,
        default: ""
    },
    subscribedArtists: {
        type: String,
        default: ""
    },

})

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
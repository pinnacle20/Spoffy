
const express = require("express");
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const songRoutes = require("./routes/song")
const passport = require("passport")
const User = require("./models/User")
require("dotenv").config();
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const port = 8000;

app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://pinnacle:" +
        process.env.PASSWORD +
        "@cluster0.7wubf7d.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo!");
    });


app.get("/", (req, res) => {
    res.send("Hello World");
})
app.use("/auth", authRoutes);
app.use("/song", songRoutes);

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretKey';
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }).
            then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => console.log(err));
    }));

app.listen(port, () => {
    console.log("App is running on Port " + port);
})



const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log("App is running on Port " + port);
})

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


const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcyrpt = require("bcrypt");
const { getToken } = require("../utils/helpers")

router.post("/register", async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(403)
            .json({ error: "A user with this email already exists" });
    }
    const hashedPassword = bcyrpt.hash(password, 10);
    const newUserData = { email, password: hashedPassword, firstName, lastName, username };
    const newUser = await User.create(newUserData);
    const token = await getToken(email, newUser);
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res
            .status(403)
            .json({ err: "Invalid credentials" });
    }
    const isPasswordValid = await bcyrpt.compare(password, user.password, function (err, result) {
    });
    console.log('Password stored is -', user.password);
    if (!isPasswordValid) {
        return res
            .status(403)
            .json({ err: "Invalid password" });
    }
    const token = await getToken(email, user);
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})

module.exports = router
const express = require("express")
const router = express.Router();
const passport = require("passport")
const Song = require("../models/Song")

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { name, thumbnail, track } = req.body;
        const artist = req.user._id;
        if (!name || !thumbnail || !track) {
            return res
                .body(301)
                .json({ err: "Insufficient details to create song" })
        }
        const songDetails = { name, thumbnail, track, artist };
        const createdSong = await Song.create(songDetails);
        return res
            .status(200)
            .json({ createdSong });
    });

router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id });
    return res
        .status(200)
        .json({ data: songs });
})

module.exports = router;
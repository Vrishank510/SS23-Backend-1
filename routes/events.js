var express = require("express");
var router = express.Router();
const Event = require("../models/event");
const upload = require("../utils/upload");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

router.get("/", (req, res) => {
    res.render('event');
});

router.post("/add", upload.single("photo"), async (req, res) => {
    try {
        const event = req.body;

        let path = "";
        if (req.file) {
            path = req.file.path;
        }

        console.log(req.file);
        if (path !== "") {
            path = path.replace(/^\s+|\s+$/g, '');
            path = path.replace(/\s\s+/g, '_');
            path = path.replace(/ /g, '_');
        }
        let path1 = path.replace(/\\/g, "/");

        console.log(path1);
        const result = await uploadToCloudinary(path1);
        event["photo"] = result.url;

        const newEvent = new Event(event)
        const err = await newEvent.save();
        console.log({ err })

        return res.send("thank you");

    }
    catch (err) {
        console.log(err);
        res.send("server error");
    }
})

const getAll = async (req, res) => {
    try {
        const events = await Event.find();
        console.log(events);
        res.json(events);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
}
router.get("/getAll", getAll)

module.exports = router;
module.exports.getAll = getAll;
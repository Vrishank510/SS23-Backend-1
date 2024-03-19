var express = require("express");
var router = express.Router();
const upload = require("../utils/upload");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const Sponsor = require("../models/sponsor");


router.get("/", (req, res) => {
    res.render('sponsor');
});

router.post("/add", upload.single("photo"), async (req, res) => {
    try {
        const sponsor = req.body;

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
        sponsor["photo"] = result.url;

        const newSponsor = new Sponsor(sponsor)
        const err = await newSponsor.save();
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
        const sponsors = await Sponsor.find();
        console.log(sponsors);
        res.json(sponsors);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
}
router.get("/getAll", getAll)

module.exports = router;
module.exports.getAll = getAll;


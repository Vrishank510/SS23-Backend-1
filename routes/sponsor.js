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
        newSponsor.save((err, e) => {
            if (err) {
                return res.status(400).json({
                    err_msg: err,
                    err: "NOT able to save Event in DB",
                });
            }
            return res.send("thank you");
        });
    }
    catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;
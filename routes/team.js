var express = require("express");
var router = express.Router();
const upload = require("../utils/upload");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const Team = require("../models/team");


router.get("/", (req, res) => {
    res.render('team');
})

router.post("/add", upload.single("photo"), async (req, res) => {
    try {

        const team = req.body;
        const email = team.email;

        const user = await Team.findOne({ email });

        // console.log(req.file);
        let path = "";
        if (req.file) {
            path = req.file.path;
        }
        if (path !== "") {
            path = path.replace(/^\s+|\s+$/g, '');
            path = path.replace(/\s\s+/g, '_');
            path = path.replace(/ /g, '_');
        }
        let path1 = path.replace(/\\/g, "/");

        // console.log(path1);
        const result = await uploadToCloudinary(path1);
        team["photo"] = result.url;

        if (!user) {
            const newTeam = new Team(team)
            newTeam.save((err, e) => {
                if (err) {
                    return res.status(400).json({
                        err_msg: err,
                        err: "NOT able to save Event in DB",
                    });
                }
                return res.send("thank you");
            });
        }
        else {
            console.log("Came here");
            console.log(team);
            const t = await Team.findOneAndUpdate({ email: email }, team);
            return res.send("Thank you")
        }
    }
    catch (err) {
        console.log(err);
        res.send("server error");
    }
});

const getAll = async (req, res) => {
    try {
        const team = await Team.find();
        let teamInfo = await Team.findTeams();
        teamInfo = teamInfo.map(x => ({
            ...x,
            members: team.filter(y => y.department === x.teamName)
        }))
        res.json(teamInfo);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
}
router.get("/all", getAll)

module.exports = router;
module.exports.getAll = getAll;

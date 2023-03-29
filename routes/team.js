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

router.get("/all", async (req, res) => {
    try {
        const team = await Team.find();
        console.log(team);
        const teamInfo = [
            {
                teamName: "Web Development",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',
                link: "webDevelopment",
                members: team.filter((t) => {
                    return t.department === "Web Development"
                })
            },
            {
                teamName: "Treasury and Pricing",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "treasury",
                members: team.filter((t) => {
                    return t.department === "Treasury and Pricing"
                })
            },
            {
                teamName: "Design and Decoration",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "designAndCreatives",
                members: team.filter((t) => {
                    return t.department === "Design and Decoration"
                })
            },
            {
                teamName: "Event Conduction and Coordination",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "eventConductionAndCoordination",
                members: team.filter((t) => {
                    return t.department === "Event Conduction and Coordination"
                })
            },
            {
                teamName: "Publicity and Media Relation",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "PM",
                members: team.filter((t) => {
                    return t.department === "Publicity and Media Relation"
                })
            },
            {
                teamName: "Sponsorship and Public Relations",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',
                link: "sponsorshipAndPublicRelations",
                members: team.filter((t) => {
                    return t.department === "Sponsorship and Public Relations"
                })
            },
            {
                teamName: "Hospitality and Transportations",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "hospitalityAndTransportation",
                members: team.filter((t) => {
                    return t.department === "Hospitality and Transportations"
                })
            },
            {
                teamName: "Quality and Control Management",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "qualityControlAndManagement",
                members: team.filter((t) => {
                    return t.department === "Quality and Control Management"
                })
            },
            {
                teamName: "Blogging",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "blogger",
                members: team.filter((t) => {
                    return t.department === "Blogging"
                })
            },
            {
                teamName: "Logistics and Security",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',

                link: "logisticsAndSecurity",
                members: team.filter((t) => {
                    return t.department === "Logistics and Security"
                })
            },
            {
                teamName: "Pro-Shows",
                position: "",
                photo: 'https://www.thephotoargus.com/wp-content/uploads/2019/07/mountainphotography23.jpg',
                link: "proShows",
                members: team.filter((t) => {
                    return t.department === "Pro-Shows"
                })
            },
        ];


        console.log(teamInfo);
        res.json(teamInfo);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;

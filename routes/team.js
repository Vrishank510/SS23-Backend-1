var express = require("express");
var router = express.Router();
const Team = require("../models/team");
const upload = require("../utils/upload");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const csvtojson = require('csvtojson');

router.get("/", (req, res) => {
    res.render('team');
});

router.post("/add", upload.single("photo"), async (req, res) => {
    try {
        // var members = [
        //     {
        //       name: 'Jaswant Singh',
        //       rollno: '208129',
        //       department: 'Biotechnology',
        //       year: '4',
        //       phone: '9983076649',
        //       mail: 'jaswantgreat382@gmail.com'
        //     },
        //     {
        //       name: 'Pranjal Kumar Sinha',
        //       rollno: '21CEB0A38',
        //       department: 'Civil Engineering',
        //       year: '3',
        //       phone: '9608172455',
        //       mail: 'pk21ceb0a38@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Simran Chawla',
        //       rollno: '21CEB0A49',
        //       department: 'Civil Engineering',
        //       year: '3',
        //       phone: '7357144559',
        //       mail: 'sc21ceb0a49@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Vandana',
        //       rollno: '21CEB0A56',
        //       department: 'Civil Engineering',
        //       year: '3',
        //       phone: '8199983601',
        //       mail: ''
        //     },
        //     {
        //       name: 'Vaishnavi Dwivedi',
        //       rollno: '21CEB0A58',
        //       department: 'Civil Engineering',
        //       year: '3',
        //       phone: '9044229996',
        //       mail: ''
        //     },
        //     {
        //       name: 'K.V.S.Yaswanth',
        //       rollno: '21MEB0B24',
        //       department: 'Mechanical Engineering',
        //       year: '3',
        //       phone: '6300998280',
        //       mail: 'kv21mebod34@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Katikala Sai Pavan',
        //       rollno: '21CEB0A24',
        //       department: 'Civil Engineering',
        //       year: '3',
        //       phone: '7093200151',
        //       mail: 'ks21ceboa24@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Karne Sri Charanya Jayanthi',
        //       rollno: '21EEB0B29',
        //       department: 'EEE',
        //       year: '3',
        //       phone: '8333099969',
        //       mail: 'ks21cebob29@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Namala Sai Sree Naveen',
        //       rollno: '21EEB0A44',
        //       department: 'EEE',
        //       year: '3',
        //       phone: '7093229946',
        //       mail: 'ns21eeb0a44@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'Shivendra Tripathi',
        //       rollno: '21MMB0A64',
        //       department: 'MME',
        //       year: '3',
        //       phone: '9617868593',
        //       mail: 'st21mmb0a64@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'A. Satya Vamsi',
        //       rollno: '201203',
        //       department: 'Civil Engineering',
        //       year: '4',
        //       phone: '8187860047',
        //       mail: 'as842082@student.nitw.ac.in'
        //     },
        //     {
        //       name: 'L.Yochana',
        //       rollno: '206260',
        //       department: 'Chemical',
        //       year: '4',
        //       phone: '6309073817',
        //       mail: 'yl832013@student.nitw.ac.in'
        //     }
        //   ]
        // var team = {
        //     name: req.body.name,
        //     chairman: req.body.chairman,
        //     members: members, 
        // };
        // const newTeam = new Team(team)
        // const err = await newTeam.save();
        console.log({ err })
        console.log(Team.find());
        return res.send("thank you");

    }
    catch (err) {
        console.log(err);
        res.send("server error");
    }
})


const getAll = async (req, res) => {
    try {
        const teams = await Team.find();
        console.log(teams);
        res.json(teams);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
}
router.get("/getAll", getAll)

module.exports = router;
module.exports.getAll = getAll;

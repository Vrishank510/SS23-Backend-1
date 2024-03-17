var express = require("express");
var router = express.Router();
const Event = require("../models/event");

router.get("/", (req, res) => {
    res.render('event');
});
module.exports = router;
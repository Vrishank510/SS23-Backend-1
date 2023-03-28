var express = require("express");
var router = express.Router();

const Registration = require("../models/Registration");

router.get('/', async (req, res) => {
    try {
        const users = await Registration.find();
        const total = users.length;

        let nitS = 0;
        let nonNit = 0;
        const reg = /student.nitw.ac.in/;
        users.forEach(user => {
            const email = user.email;
            const isNit = reg.test(email);

            isNit ? nitS = nitS + 1 : nonNit = nonNit + 1;
        });

        res.render('filters', { total, nitStudents: nitS, nonNit });
    }
    catch (err) {
        console.log(err);
        res.send('server error');
    }
});

router.get('/paid', async (req, res) => {
    try {
        const users = await Registration.find();

        const details = {
            paidForRegDay1: 0,
            paidForRegDay2: 0,
            paidForRegDay3: 0,
            paidForAccomodationDay0: 0,
            paidForAccomodationDay1: 0,
            paidForAccomodationDay2: 0,
            paidForAccomodationDay3: 0,
            paidForProshow1: 0,
            paidForProshow2: 0,
            paidForProshow3: 0
        }

        const reg = /student.nitw.ac.in/;

        users.forEach(user => {
            const email = user.email;
            const isNit = reg.test(email);

            if (!isNit) {
                details.paidForRegDay1 = details.paidForRegDay1 + user.paidForRegDay1;
                details.paidForRegDay2 = details.paidForRegDay2 + user.paidForRegDay2;
                details.paidForRegDay3 = details.paidForRegDay3 + user.paidForRegDay3;
                details.paidForAccomodationDay0 = details.paidForAccomodationDay0 + user.paidForAccomodationDay0;
                details.paidForAccomodationDay1 = details.paidForAccomodationDay1 + user.paidForAccomodationDay1;
                details.paidForAccomodationDay2 = details.paidForAccomodationDay2 + user.paidForAccomodationDay2;
                details.paidForAccomodationDay3 = details.paidForAccomodationDay3 + user.paidForAccomodationDay3;
                details.paidForProshow1 = details.paidForProshow1 + user.paidForProshow1;
                details.paidForProshow2 = details.paidForProshow2 + user.paidForProshow2;
                details.paidForProshow3 = details.paidForProshow3 + user.paidForProshow3;
            }
        });

        res.render('payments', { details });
    } catch (err) {
        console.log(err);
        res.send('server error');
    }
})

module.exports = router;
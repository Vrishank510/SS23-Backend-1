require("dotenv").config();
let express = require('express');
let app = express();
const path = require('path')
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const team = require("./routes/team");
const sponsor = require("./routes/sponsor");
const { getUser, Oauth } = require("./controllers/auth");
const events = require("./routes/events");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

if (process.env.ADMIN) {

  app.get("/addEvent", (req, res) => {
    res.render("addEvent", {});
  })
  app.get("/addPromoCode", (req, res) => {
    res.render("addPromoCode", {});
  })

  app.set('views', path.join(__dirname, 'views'));
  app.use('/admin/sponsor', sponsor);
  app.use('/admin/team', team);
  app.use('/admin/event', events);
} else {
  // really sorry for this lol
  app.get("/api/user/:email", getUser);
  app.post("/api/oauth", Oauth);

  app.get("/api/sponsor", sponsor.getAll)
  app.get("/api/team", team.getAll);
  app.get("/api/event", events.getAll);
}
app.listen(process.env.PORT || 5000, () => {
  console.log("Started at 5000");
});

(async () => {
  const Sponsor = require("./models/sponsor");
  const Team = require("./models/team");
  const res = await Sponsor.collection.drop();
  console.log({ res })
})()
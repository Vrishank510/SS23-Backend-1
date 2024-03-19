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
} else {
  // really sorry for this lol
  app.get("/user/:email", getUser);
  app.post("/oauth", Oauth);

  app.get("/sponsor", sponsor.getAll)
  app.get("/team", team.getAll);
}
app.listen(process.env.PORT || 5000, () => {
  console.log("Started at 5000");
})

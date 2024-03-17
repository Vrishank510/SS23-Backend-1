require("dotenv").config();
let express = require('express');
let app = express();
const path = require('path')
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const offlineUserRoutes = require("./routes/offlineUser");
const eventRoutes = require("./routes/event");
const paymentRoutes = require("./routes/payment");
const contactUSRoutes = require("./routes/contactUs");
const promoCodeRoutes = require("./routes/promoCode");
const filters = require("./routes/filters");
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
  
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  // app.use(expressJWT({ secret: process.env.SECRET ,algorithms: ['sha1', 'RS256', 'HS256'],}).unless({ path: ['/', '/login', '/wutangclan'] }));
  app.use("/", authRoutes);
  app.use("/", eventRoutes);
  app.use("/", contactUSRoutes);
  app.use("/", promoCodeRoutes);
  app.use("/payment", paymentRoutes);
  app.use("/", offlineUserRoutes);
  app.use("/filters", filters);
  app.use("/team", team);
  app.use("/sponsor", sponsor);
} else {
  // really sorry for this lol
  app.get("/user/:email", getUser);
  app.post("oauth", Oauth);

  app.get("/sponsor/getAll", sponsor.getAll)
  app.get("/team/all", team.getAll);
  app.get('/payment', paymentRoutes)
}
app.listen(process.env.PORT || 5000, () => {
  console.log("Started at 5000");
})

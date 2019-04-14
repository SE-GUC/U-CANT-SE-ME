const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
//Require Route Handlers
const investors = require("./routes/api/investors");
const lawyers = require("./routes/api/lawyers");
const reviewers = require("./routes/api/reviewers");
const admins = require("./routes/api/admins");
const cases = require("./routes/api/cases");
const dcases = require("./routes/api/dcases");
const formTemplates = require("./routes/api/formTemplates");
const companies = require("./routes/api/companies");
const notifications = require("./routes/api/notifications");
const externalEntities = require("./routes/api/externalEntities");

// Passport Config
require("./config/passport")(passport);

const app = express();

app.use(cors());

//Getting Mongo's connection URI
const db = require("./config/keys").mongoURI;

//Connecting to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

//Homepage
app.get("/", (req, res) => res.send("HomePage"));

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Use Route Handlers
app.use("/api/investors", investors);
app.use("/api/lawyers", lawyers);
app.use("/api/reviewers", reviewers);
app.use("/api/admins", admins);
app.use("/api/companies", companies);
app.use("/api/cases", cases);
app.use("/api/dcases", dcases);
app.use("/api/formTemplates", formTemplates);
app.use("/api/notifications", notifications);
app.use("/api/externalEntities", externalEntities);

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const methodOverride = require("method-override");

// const { flash } = require("express-flash-message");

const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./server/config/db");
const app = express();
const port = 3000 || process.env.Port;

// // Connect to Database
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder
app.use(express.static("public"));
app.use(methodOverride("_method"));
// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
app.use(flash());

// // Flash Messages
// app.use(flash({ sessionKeyName: "flashMessage" }));

// template engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
// Routes
app.use("/", require("./server/routes/customer"));
// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

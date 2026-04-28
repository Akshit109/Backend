const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new FileStore({}),
  secret: "secret-key",
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.send("Username required");
  }

  req.session.user = username;
  res.redirect("/home");
});

app.get("/home", isLoggedIn, (req, res) => {
  res.render("home", { uname: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
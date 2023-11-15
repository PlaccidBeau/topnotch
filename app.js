const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/topnotch";
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbURL);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("home");
});
// Breakfast
app.get("/breakfast/meals", (req, res) => {
  res.render("breakfast/meals");
});
app.get("/breakfast/eggs&toast", (req, res) => {
  res.render("breakfast/eggs&toast");
});
app.get("/breakfast/omelets", (req, res) => {
  res.render("breakfast/omelets");
});
app.get("/breakfast/sandwiches", (req, res) => {
  res.render("breakfast/sandwiches");
});

// lunch and dinner
app.get("/lunch&dinner/beefburgers", (req, res) => {
  res.render("lunch&dinner/lunchanddinner");
});
app.get("/lunch&dinner/appetizers", (req, res) => {
  res.render("lunch&dinner/appetizers");
});
app.get("/lunch&dinner/soup", (req, res) => {
  res.render("lunch&dinner/soup");
});
app.get("/lunch&dinner/salads", (req, res) => {
  res.render("lunch&dinner/salads");
});
app.get("/lunch&dinner/chicken", (req, res) => {
  res.render("lunch&dinner/chicken");
});
app.get("/lunch&dinner/sandwiches", (req, res) => {
  res.render("lunch&dinner/sandwiches");
});
app.get("/lunch&dinner/turkeyburgers", (req, res) => {
  res.render("lunch&dinner/turkeyburgers");
});
app.get("/lunch&dinner/melts", (req, res) => {
  res.render("lunch&dinner/melts");
});
app.get("/lunch&dinner/platters", (req, res) => {
  res.render("lunch&dinner/platters");
});
app.get("/lunch&dinner/sides", (req, res) => {
  res.render("lunch&dinner/sides");
});
// Beverages
app.get("/beverages", (req, res) => {
  res.render("beverages");
});

// Kids Menu
app.get("/kidsmenu", (req, res) => {
  res.render("KidsMenu/kidsmenu");
});

app.all("*", (req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});

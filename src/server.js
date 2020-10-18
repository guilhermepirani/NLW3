// import packages
const express = require("express");
const path = require("path");
const pages = require("./pages.js");

// Start express
const server = express();
server

  //Body req
  .use(express.urlencoded({ extended: true }))

  // Using static files
  .use(express.static("public"))
  // Configure template engine
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs")

  // Create route
  .get("/", pages.index)
  .get("/orphanage", pages.orphanage)
  .get("/orphanages", pages.orphanages)
  .get("/create-orphanage", pages.createOrphanage)
  .get("/about-happy", pages.aboutHappy)
  .get("/login", pages.login)
  .get("/testimonials", pages.testimonials)
  .post("/save-orphanage", pages.saveOrphanage);

// Turn on server
server.listen(5500);

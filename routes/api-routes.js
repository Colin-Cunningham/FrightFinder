// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require("sequelize");
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  
  app.get("/api/random/:id", function(req, res) {
    db.Spooky_spaces.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbSpooky) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbSpooky);
    });
  });

  app.get("/api/choose/:city", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Spooky_spaces.findAll({
      where: {
        city: req.params.city
      }
    }).then(function(dbSpooky) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbSpooky);
    });
  });
  app.get("/api/current/:lat/:long", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Spooky_spaces.findAll({

      where: Sequelize.and(
        { city_lat: req.params.lat }, { city_long: req.params.long },  
    )

    }).then(function(dbSpooky) {
      // We have access to the todos as an argument inside of the callback function
      console.log(dbSpooky);
      res.json(dbSpooky);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      console.log("not logged in");
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

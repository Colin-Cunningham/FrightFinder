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
  app.post("/api/create", function(req, res) {
    db.Spooky_spaces.create({
      location: req.body.location,
      country: "United States",
      city: req.body.email,
      state: req.body.state,
      state_ab: "N/A",
      description: req.body.description,
      cur_lat: 42.962106,
      cur_long: -85.504893,
      city_lat: 42.96,
      city_long: 42.1
    }).then(function() {
        res.json("cool!");
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
    
  app.get("/api/chosen/:id", function(req, res) {
    db.Spooky_spaces.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbSpooky) {
      console.log(dbSpooky)
      for (var i = 0; i < dbSpooky.length; i++) {
        var latlon = dbSpooky[i].cur_lat + "," + dbSpooky[i].cur_long;
        var id= dbSpooky[i].id
        var location= dbSpooky[i].location
        var description= dbSpooky[i].description
        var apiKey = process.env.APIKEY;
        var img_url =
          "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +
          latlon +
          "&key=" +
          apiKey;
      }
      const loop = {
        "id": id,
        "location": location,
        "description": description,
        "image": img_url
      }
      res.json(loop);
    });
  });
};





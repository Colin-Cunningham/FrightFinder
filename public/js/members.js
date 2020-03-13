$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  $(document).on("click", "#add", addUser);

  function addUser(){
    var userData = {
      location: $("#loca").val().trim(),
      city: $("#cit").val().trim(),
      state: $("#stat").val().trim(),
      desc: $("#des").val().trim()
    };
  addLocation(userData.location, userData.city, userData.state, userData.desc)
  }
  function addLocation(location, city, state, description) {
    $.post("/api/create", {
        location: location,
        city: city,
        state: state,
        description: description
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
 
});

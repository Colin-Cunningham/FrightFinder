$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  $(document).on("click", "#add", addUser);

  function addUser(){
     var location = $("#loca").val().trim();
      var city = $("#cit").val().trim();
      var state = $("#stat").val().trim();
      var desc = $("#des").val().trim();
     $.post("/api/create", {
        location: location,
        city: city,
        state: state,
        description: desc
      }).then(function(response) {
        console.log("you did it!")
      });
  }
 
});

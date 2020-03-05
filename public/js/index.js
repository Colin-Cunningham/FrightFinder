$(document).ready(function() {
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#current", currenLoc);
  $(document).on("click", "#random", randomLoc);
  $(document).on("click", "#name", fixClass);
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  function showPosition(position) {
    var lat= position.coords.latitude;
    var long= position.coords.longitude;
    return lat, long
  };
  function chooseLoc() {
    var city = $("#input")
      .val()
      .trim();
    $.ajax("/api/choose/" + city, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(`<p id="name" style="color: white">${response[i].location}</p> \n 
        <p id="desc" style="color:white">${response[i].description} </p> `);
      }
    });
  }
  function currenLoc() {
    getLocation()

    $.get("/api/current/" + lat + "/" + long, {
        type: "GET"
    }).then(function(response){
        var dataContainer = $("#col2");
        dataContainer.empty();
        for (var i = 0; i < response.length; i++) {
          dataContainer.append(`<p id="name" style="color: white">${response[i].location}</p> \n 
          <p id="desc" style="color:white">${response[i].description} </p> `);
        }
    })
  }
  function fixClass() {
    $("#desc").toggleClass("hide");
    console.log("coolio");
  }
 
});

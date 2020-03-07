const currentLocation = [];

$(document).ready(function() {
  $(document).on("click", "#current", getLocation);
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
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    currentLocation.push(lat, long);
  }
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
        // eslint-disable-next-line Unexpected Character
        dataContainer.append(`<a href= "../public/maps.html"><p id="name" style="color: white">${response[i].location}</p></a>`);
      }
    });
  }
  function currenLoc() {
    var lat = currentLocation[0];
    var long = currentLocation[1];
    console.log(lat)
    $.get("/api/current/" + lat + "/" + long, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(`<a href="../public/maps.html"><p id="name" style="color: white">${response[i].location}</p></a>`);
      }
    });
  }
  function fixClass() {
    $("#desc").toggleClass("hide");
    console.log("coolio");
  }
});
var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

const currentLocation = [];

$(document).ready(function() {
  $(document).ready(getLocation);  
  $(document).on("click", "#current", currenLoc);
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#random", randomLoc);
  $(document).on("click", ".name", clickEvent);

  function getLocation() {
      currentLocation.length = 0
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
        dataContainer.append(`<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`);
      }
    });
  }
  function currenLoc() {
    var lat = (currentLocation[0]).toFixed(2);
    var long = (currentLocation[1]).toFixed(1);
    $.get("/api/current/" + lat + "/" + long, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(`<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`);
      }
    });
  }

  function randomLoc() {
    var id= Math.floor((Math.random()* 9001));
    $.ajax("/api/random/" + id, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(`<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`);
      }
    });
  };
  //ON CLICK Function
  function clickEvent() {
    
    var id = $(".scare").attr("id");
    console.log(id)
    $.ajax("/api/random/" + id, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        var latlon = response[i].cur_lat + "," + response[i].cur_long;
        var apiKey = ""
        var img_url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+latlon+"&key="+ apiKey;
        dataContainer.append(`<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>
        <p style="color: white">${response[i].description}</p><img src="${img_url}">`);
      }
    });
  }
});

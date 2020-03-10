const currentLocation = [];

$(document).ready(function() {
  $(document).ready(getLocation);  
  $(document).on("click", "#current", currenLoc);
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#random", randomLoc);
  $(document).on("click", ".name", clickEvent);
  $(document).on("click", "#thumbRating", thumbs);
 
 

function thumbs() {
    $( "#thumbRating" ).toggleClass( "fa-thumbs-down" )
}

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
  return lat, long;
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
      dataContainer.append(`<p id="name" style="color: white">${response[i].location}</p>\n 
        <p id="desc" style="color:white">${response[i].description} </p> `);
    }
  });
}
function currenLoc() {
  getLocation();

  $.get("/api/current/" + lat + "/" + long, {
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
  function getLocation() {
      currentLocation.length = 0
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("got COoords")
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
        var apiKey = "AIzaSyAH6XIzkCiAt0U8l0llfWf2QSOcE0oHAx4"
        var img_url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+latlon+"&key="+ apiKey;
        dataContainer.append(`<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}<i id="thumbRating" class="fa fa-thumbs-up"></i></p></a>  
   <div class="ui raised segment"id="desc"><img class="ui large left floated image"id="image" src="${img_url}"><p style="">${response[i].description}</p></div>`);
      }
    });
  }
});


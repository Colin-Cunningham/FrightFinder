const currentLocation = [];

$(document).ready(function() {
  $(document).on("click", "#current", currenLoc);
  $(document).ready(getLocation);
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#random", randomLoc);
  $(document).on("click", ".name", clickEvent);
  $(document).on("click", "#thumbRating", thumbs);

  function thumbs() {
    $("#thumbRating").toggleClass("fa-thumbs-down");
  }

  function getLocation() {
    currentLocation.length = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("got COoords");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    currentLocation.push(lat, long);
    console.log(currentLocation)
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
        dataContainer.append(
          `<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`
        );
      }
    });
  }
  function currenLoc() {
    var lat = currentLocation[0].toFixed(2);
    var long = currentLocation[1].toFixed(1);
    $.get("/api/current/" + lat + "/" + long, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(
          `<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`
        );
      }
    });
  }

  function randomLoc() {
    var id = Math.floor(Math.random() * 9001);
    $.ajax("/api/random/" + id, {
      type: "GET"
    }).then(function(response) {
      var dataContainer = $("#col2");
      dataContainer.empty();
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(
          `<a class="name"><p class="scare" id="${response[i].id}" style="color: white">${response[i].location}</p></a>`
        );
      }
    });
  }
  //ON CLICK Function
  function clickEvent() {
    var id = $(".scare").attr("id");
    console.log(id);
    $.ajax("/api/chosen/" + id, {
      type: "GET"
    }).then(function(response) {
      console.log(response)
      var dataContainer = $("#col2");
      dataContainer.empty();
      dataContainer.append(`<p class="scare" id="${response.id}" style="color: white"><a class="name" style="color: white">${response.location}</a><i id="thumbRating" class="fa fa-thumbs-up"></i></p>  
   <div id="desc"><img id="image" src="${response.image}"><div class="text">
   <p style="">${response.description}</p></div></div>`);
    });
  }
});

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
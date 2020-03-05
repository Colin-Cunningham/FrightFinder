$(document).ready(function() {
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#current", currenLoc);
  $(document).on("click", "#random", randomLoc);

  function chooseLoc() {
    var city = $("#input")
      .val()
      .trim();
    $.ajax("/api/choose/" + city, {
      type: "GET"
    }).then(function(response) {
       var dataContainer = $("#col2");
       dataContainer.empty()
      for (var i = 0; i < response.length; i++) {
        dataContainer.append(`<h2 style="color: white">${response[i].location}</h2> \n <p style="color:white">${response[i].description} </p> `);
      }
      console.log(dataContainer);
      console.log(response);
    //   dataContainer.append(`<h2 style="color: white">${response.location}</h2> \n <p style="color:white">${response.description} </p> `);
      // Reload the page to get the updated lis
    });
  }
  function currenLoc() {
    $.get("/api/current", function(data) {
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
      console.log(userData);
      console.log(data);
    });
  }
});

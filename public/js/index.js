$(document).ready(function() {
  $(document).on("click", "#choose", chooseLoc);
  $(document).on("click", "#current", currenLoc);
  $(document).on("click", "#random", randomLoc);

  function chooseLoc() {
    $.get("/api/current", function(data) {
      location = data;
    });
  }
});

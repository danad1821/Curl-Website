$(document).ready(function () {
  $("#header").load("../Header/header.html");
  $("#logOut").click(function () {
    sessionStorage.removeItem("loggedInUser");
    $("#userProfileBtn").hide();
    $("#signInBtn").show();
    $(location).prop("href", "../index.html");
  });
});

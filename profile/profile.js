$(document).ready(function () {
  $("#header").load("../Header/header.html");
  $("#logOut").click(function () {
    sessionStorage.removeItem("loggedInUser");
    $("#userProfileBtn").hide();
    $("#signInBtn").show();
    $(location).prop("href", "../index.html");
  });
  let currentUser=JSON.parse(sessionStorage.getItem("loggedInUser"));
  $("#userImg").attr("src", currentUser.profilePicture);
  $("#fullName").text(currentUser.firstName+" "+currentUser.lastName);
  $("#location").text(currentUser.address);
  $("#wishlistItems").text(currentUser.wishlist.length+" items");
  for(const room of currentUser.rooms){
    let roomBtn=$("<button>").text(room.roomName).addClass("roomBtn btn");
    $("#rooms").append(roomBtn)
    roomBtn.click(function () {
      localStorage.setItem("room", JSON.stringify(room))
      $(location).prop('href', '../community/room.html')
    });
  }
  for(const event of currentUser.events){
    let eventDiv=$("<div>")
  }
});

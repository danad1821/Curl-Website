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
    let eventDiv=$("<div>").addClass('eventDiv');
    let eventTextDiv=$("<div>").html("<h5>"+event.day+"</h5>"+
      "<p class='timingText'>From "+event.startTime+" to "+event.endTime+"</p>"+
      "<p class='eventName'>"+event.name+"</p>"
    )
    let eventReserved=$("<p class='reservedText'>Reserved</p>");
    eventDiv.append(eventTextDiv, eventReserved)
    $("#events").append(eventDiv)
  }

  // user info section 
  $("#firstName").val(currentUser.firstName);
  $("#lastName").val(currentUser.lastName);
  $("#username").val(currentUser.username);
  $("#email").val(currentUser.email);
  $("#address").val(currentUser.address);
  $("#phoneNumber").val(currentUser.phone)
});

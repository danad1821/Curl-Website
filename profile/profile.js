$(document).ready(function () {
  $("#header").load("../Header/header.html");
  $("#logOut").click(function () {
    sessionStorage.removeItem("loggedInUser");
    $("#userProfileBtn").hide();
    $("#signInBtn").show();
    $(location).prop("href", "../index.html");
  });
  let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  $("#userImg").attr("src", currentUser.profilePicture);
  $("#fullName").text(currentUser.firstName + " " + currentUser.lastName);
  $("#location").text(currentUser.address);
  $("#wishlistItems").text(currentUser.wishlist.length + " items");
  for (const room of currentUser.rooms) {
    let roomBtn = $("<button>").text(room.roomName).addClass("roomBtn btn");
    $("#rooms").append(roomBtn);
    roomBtn.click(function () {
      localStorage.setItem("room", JSON.stringify(room));
      $(location).prop("href", "../community/room.html");
    });
  }
  for (const event of currentUser.events) {
    let eventDiv = $("<div>").addClass("eventDiv");
    let eventTextDiv = $("<div>").html(
      "<h5>" +
        event.day +
        "</h5>" +
        "<p class='timingText'>From " +
        event.startTime +
        " to " +
        event.endTime +
        "</p>" +
        "<p class='eventName'>" +
        event.name +
        "</p>"
    );
    let eventReserved = $("<p class='reservedText'>Reserved</p>");
    eventDiv.append(eventTextDiv, eventReserved);
    $("#events").append(eventDiv);
  }

  function displayCurrentUser() {
    // user info section
    $("#firstName").val(currentUser.firstName);
    $("#lastName").val(currentUser.lastName);
    $("#username").val(currentUser.username);
    $("#email").val(currentUser.email);
    $("#address").val(currentUser.address);
    $("#phoneNumber").val(currentUser.phone);
  }

  displayCurrentUser();

  function isExistingUsername(data, username) {
    for (const user of data.users) {
      if (user.username == username) {
        return true;
      }
    }
    return false;
  }

  function isExistingEmail(data, email) {
    for (const user of data.users) {
      if (user.email == email) {
        return true;
      }
    }
    return false;
  }

  // save button
  $("#saveBtn").click(function (e) {
    e.preventDefault();

    $.ajax({
      url: "../user.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (
          ($("#username").val() == currentUser.username &&
            $("#email").val() == currentUser.email) ||
          (isExistingUsername(data, $("#username").val()) == false &&
            isExistingEmail(data, $("#email").val()) == false)
        ) {
          currentUser.firstName = $("#firstName").val();
          currentUser.lastName = $("#lastName").val();
          currentUser.address = $("#address").val();
          currentUser.phone = $("#phoneNumber").val();
          currentUser.email = $("#email").val();
          currentUser.username = $("#username").val();
          sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          displayCurrentUser();
        }
      },
      error: function (error) {
        console.error("Error loading data:", error);
      },
    });
  });
});

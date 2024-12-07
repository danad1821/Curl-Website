$(document).ready(function () {
  $("#header").load("../Header/header.html");

  $("#logOut").click(function () {
    sessionStorage.removeItem("loggedInUser");
    $("#userProfileBtn").hide();
    $("#signInBtn").show();
    $(location).prop("href", "../index.html");
  });

  let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  // Update user profile details
  $("#userImg").attr("src", currentUser.profilePicture);
  $("#fullName").text(currentUser.firstName + " " + currentUser.lastName);
  $("#location").text(currentUser.address);

  // Count wishlist items and update #wishlistItems
  function updateWishlistCount() {
    const wishlistCount = currentUser.wishlist.length || 0; // Handle empty wishlist
    $("#wishlistItems").text(`${wishlistCount} items`);
  }

  updateWishlistCount(); // Initial update

  // Render rooms
  for (const room of currentUser.rooms) {
    let roomBtn = $("<button>").text(room.roomName).addClass("roomBtn btn");
    $("#rooms").append(roomBtn);
    roomBtn.click(function () {
      localStorage.setItem("room", JSON.stringify(room));
      $(location).prop("href", "../community/room.html");
    });
  }

  // Render events
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
    $("#firstName").val(currentUser.firstName);
    $("#lastName").val(currentUser.lastName);
    $("#usernameProfile").val(currentUser.username);
    $("#emailProfile").val(currentUser.email);
    $("#address").val(currentUser.address);
    $("#phoneNumber").val(currentUser.phone);
  }

  displayCurrentUser();

  // Check if username exists
  function isExistingUsername(data, username) {
    return data.users.some((user) => user.username === username);
  }

  // Check if email exists
  function isExistingEmail(data, email) {
    return data.users.some((user) => user.email === email);
  }

  // Save button click event
  $("#saveBtn").click(function (e) {
    e.preventDefault();

    $.ajax({
      url: "../user.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (
          ($("#usernameProfile").val() === currentUser.username &&
            $("#emailProfile").val() === currentUser.email) ||
          (!isExistingUsername(data, $("#usernameProfile").val()) &&
            !isExistingEmail(data, $("#emailProfile").val()))
        ) {
          currentUser.firstName = $("#firstName").val();
          currentUser.lastName = $("#lastName").val();
          currentUser.address = $("#address").val();
          currentUser.phone = $("#phoneNumber").val();
          currentUser.email = $("#emailProfile").val();
          currentUser.username = $("#usernameProfile").val();

          sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          displayCurrentUser();
          window.location.reload();
        }
      },
      error: function (error) {
        console.error("Error loading data:", error);
      },
    });
  });
});

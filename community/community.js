$(document).ready(function () {
  //loads the header
  $("#header").load("../Header/header.html");
  let rooms = [];
  let roomsDisplay = $("#roomsDisplay");
  //local storage variable for the room the user wants to access
  localStorage.setItem("room", "");
  $.ajax({
    url: "community.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      getRooms(data);
      generateRoomDisplay();
    },
    error: function (error) {
      console.error("Error loading data:", error);
    },
  });
  // gets all rooms
  function getRooms(data) {
    for (const room of data.rooms) {
      rooms.push(room);
    }
  }
  // displays all rooms 
  function generateRoomDisplay() {
    for (const room of rooms) {
      const roomDiv = $("<div>").addClass("roomDiv");
      const roomButton = $("<button>")
        .text("Join")
        .addClass("communityPageBtn joinBtn");
      const roomInnerDiv = $("<div>").addClass("roomInnerDiv");
      const roomDesc=$("<p>"+room.description+"</p>").addClass('roomDesc')

      // Add error handling for image loading
      const roomImage = $(
        '<img src="' +
          room.roomImg +
          '" alt="Room Image" onerror="this.src=\'error.jpg\'">'
      ).addClass("roomImg"); // Replace 'error.jpg' with your desired error image
      const roomTitle=$("<p>"+room.roomName+"</p>").addClass('roomTitle')
      roomButton.click(function () {
        if(sessionStorage.getItem("loggedInUser")){
          $("#signInModal").removeClass("show");
          localStorage.setItem("room", JSON.stringify(room))
          $(location).prop('href', 'room.html')
        }
        else{
          $("#signInModal").addClass("show");
        }
        
      });
      roomInnerDiv.append(roomImage, roomTitle);
      roomDiv.append(roomInnerDiv, roomDesc, roomButton);
      roomsDisplay.append(roomDiv);
    }
  }
  // allows the create a room pop up to be displayed
  $("#createRoomPopup").on("shown.bs.modal", function () {
    $("#createBtn").focus();
  });
});

$(document).ready(function () {
  $("#header").load("../Header/header.html");
  let rooms = [];
  let roomsDisplay = $("#roomsDisplay");
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

  function getRooms(data) {
    for (const room of data.rooms) {
      rooms.push(room);
    }
  }

  function generateRoomDisplay() {
    for (const room of rooms) {
      const roomDiv = $("<div>").addClass("roomDiv");
      const roomButton = $("<button>")
        .text(room.roomName)
        .addClass("communityPageBtn");
      const roomInnerDiv = $("<div>").addClass("roomInnerDiv");

      // Add error handling for image loading
      const roomImage = $(
        '<img src="' +
          room.roomImg +
          '" alt="Room Image" onerror="this.src=\'error.jpg\'">'
      ).addClass("roomImg"); // Replace 'error.jpg' with your desired error image
      roomButton.click(function () {
        localStorage.setItem("room", JSON.stringify(room))
        $(location).prop('href', 'room.html')
      });
      roomInnerDiv.append(roomImage);
      roomDiv.append(roomButton, roomInnerDiv);
      roomsDisplay.append(roomDiv);
    }
  }
});

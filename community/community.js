$(document).ready(function () {
    let rooms=[]
    let roomsDisplay=$("#roomsDisplay")
  $.ajax({
    url: "community.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
        getRooms(data);
        generateRoomDisplay()
    },
    error: function (error) {
      console.error("Error loading data:", error);
    },
  });

  function getRooms(data){
    for(const room of data.rooms){
        rooms.push(room);
    }
  }

  function generateRoomDisplay() {
    console.log(rooms);

    for (const room of rooms) {
        const roomDiv = $('<div>').addClass('roomDiv');
        const roomButton = $('<button>').text(room.roomName).addClass('communityPageBtn');
        const roomInnerDiv = $('<div>').addClass('roomInnerDiv');

        // Add error handling for image loading
        const roomImage = $('<img src="' + room.roomImg + '" alt="Room Image" onerror="this.src=\'error.jpg\'">').addClass('roomImg'); // Replace 'error.jpg' with your desired error image

        roomInnerDiv.append(roomImage);
        roomDiv.append(roomButton, roomInnerDiv);
        roomsDisplay.append(roomDiv);
    }
}

});

$(document).ready(function () {
  $("#header").load("../Header/header.html");
  let room = JSON.parse(localStorage.getItem("room"));
  let roomName = $(
    "<h1 class='roomName'>" + room.roomName.toLowerCase() + "</h1>"
  ).addClass("roomName");
  let postBtn = $(
    "<button data-bs-toggle='modal' data-bs-target='#newPostModal'><img src='../designImages/Group 226.png'/> New Post</button>"
  ).addClass('postBtn');
  let userProfile = $("<img src='../designImages/Frame 2.png'/>").addClass('mainUserIcon');
  $("#topSection").append(roomName, postBtn, userProfile);
  let postModal=$("#newPostModal");
  postModal.addEventListener('shown.bs.modal', () => {
    postBtn.focus()
  })
//   postBtn.click(function(){
//     postModal.toggle()
//   })
});

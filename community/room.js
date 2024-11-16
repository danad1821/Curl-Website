$(document).ready(function () {
  //puts header on page
  $("#header").load("../Header/header.html");
  //gets current room
  let room = JSON.parse(localStorage.getItem("room"));
  console.log(room);
  let roomName = $(
    "<h1 class='roomName'>" + room.roomName.toLowerCase() + "</h1>"
  ).addClass("roomName");
  let postBtn = $(
    "<button data-bs-toggle='modal' data-bs-target='#newPostModal'><img src='../designImages/Group 226.png'/> New Post</button>"
  ).addClass("postBtn");
  let userProfile = $("<img src='../designImages/Frame 2.png'/>").addClass(
    "mainUserIcon"
  );
  $("#topSection").append(roomName, postBtn, userProfile);
  //makes new post popup appear
  $("#newPostModal").on("shown.bs.modal", function () {
    postBtn.focus();
  });

  function readURL(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          $("#inputImg").attr("src", e.target.result).width("100%").height(150);
          $("#fileInputDiv>label").css("display", "none");
          $("#inputImg").css("border-radius", "30px");
           $("#fileInputDiv").css("padding", "0px")
        } catch (error) {
          console.error("Error displaying image:", error);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#fileInput").change(function () {
    readURL(this);
  });

  let postsSection = $("#postsSection");

  if (room.posts.length > 0) {
    for (const post of room.posts) {
      let posting = $("<div>").addClass("post");
      //creates post
      let postDiv = $("<div>").addClass("postDiv");
      //creates top part of post
      let topPostSection = $("<div>").addClass("topPostSection");
      let topPostSectionImg = $("<img src='" + post.userImg + "'/>").addClass(
        "topPostSectionImg"
      );
      let topPostSectionUser = $("<h2>" + post.user + "</h2>");
      topPostSection.append(topPostSectionImg, topPostSectionUser);

      let postMainSection = $("<div>").addClass("postMainContent");
      let postImg = $("<img src='" + post.img + "'/>").addClass("postImg");
      let postInnerDiv = $("<div>").html(
        "<div><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon icon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg>" +
          post.likes +
          "</div>"
      );
      postInnerDiv.append(
        "<svg class='icon commentIcon' data-bs-toggle='modal' data-bs-target='#commentModal' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><title>comment-blank</title><g id='Layer_2' data-name='Layer 2'><g id='invisible_box' data-name='invisible box'><rect width='48' height='48' fill='none'/></g><g id='icons_Q2' data-name='icons Q2'><path d='M40,8V32H13.6l-1.2,1.1L8,37.3V8H40m2-4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2,2,2,0,0,0,1.4-.6L15.2,36H42a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z'/></g></g></svg>"
      );
      postInnerDiv.addClass("postInnerDiv");
      let postCaption = $("<p>" + post.caption + "</p>").addClass(
        "postCaption"
      );

      postMainSection.append(postImg, postInnerDiv, postCaption);
      postDiv.append(topPostSection, postMainSection);

      let commentsDiv = $("<div>").addClass("commentsDiv");

      if (post.comments.length > 0) {
        for (const comment of post.comments) {
          let topCommentSection = $("<div>").addClass("topCommentSection");
          let topCommentSectionUser = $(
            "<div><img src='" +
              comment.userImg +
              "'/> <h3>" +
              post.user +
              "</h3></div>"
          ).addClass("topCommentSectionUser");
          let topCommentSectionActions = $(
            "<div><p>" +
              comment.likes +
              "</p> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon icon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg><svg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' id='reply' class='icon replyIcon' x='0' y='0' version='1.1' viewBox='0 0 96 96'> <switch><foreignObject width='1' height='1' x='0' y='0' requiredExtensions='http://ns.adobe.com/AdobeIllustrator/10.0/'></foreignObject><g><path d='M56 36H17.656l18.628-18.627a4 4 0 0 0-5.657-5.657L5.172 37.171a4 4 0 0 0 0 5.657l25.455 25.456a4 4 0 0 0 5.657-5.657L17.658 44H56c15.464 0 28 12.536 28 28v4a4 4 0 0 0 8 0v-4c0-19.883-16.118-36-36-36z'></path></g></switch></svg></div>"
          ).addClass("topCommentSectionActions");
          topCommentSection.append(
            topCommentSectionUser,
            topCommentSectionActions
          );

          let commentMainSection = $("<p>" + comment.comment + "</p>").addClass(
            "commentMainSection"
          );
          commentsDiv.append(topCommentSection, commentMainSection);
        }
      }

      posting.append(postDiv, commentsDiv);
      postsSection.append(posting);

      $("#commentModal").on("shown.bs.modal", function () {
        $(".commentIcon")[0].focus();
      });
    }
  }
});

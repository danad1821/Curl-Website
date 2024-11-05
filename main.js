$(document).ready(function () {
  $.ajax({
    url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      displayBestSellingBooks(data.books);
    },
    error: function (error) {},
  });

  let booksDisplay = $("#booksDisplay");
  function displayBestSellingBooks(data) {
    for (let i = 0; i < 4; i++) {
      let bookDiv = $("<div>");
      bookDiv.addClass("bookCard");
      let bookImg = $("<img>");
      bookImg.prop("src", data[i].img);
      bookImg.addClass("bookImg");
      bookDiv.append(bookImg);
      let title = $("<b>").text(data[i].title);
      let author = $("<p>").html("Author: <b>" + data[i].author+"</b>");
      bookDiv.append(title);
      bookDiv.append(author);
      let innerDiv=$('<div>').html("$"+data[i].price+" <div><button class='homePageBtn'>Add</button></div>")
      innerDiv.addClass('innerBookDiv')
      bookDiv.append(innerDiv)
      booksDisplay.append(bookDiv)
    }
  }
});

$(document).ready(function () {
  let bestsellers = [];
  let booksDisplay = $("#booksDisplay");
  let bookC=$(".bookCard")[0]
  let numberOfDisplayedBooks=Math.floor(booksDisplay.width()/190);
  let startBooks = 0;
  let endBooks = numberOfDisplayedBooks-1;

  $.ajax({
    url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      getBestsellers(data);
      displayBestSellingBooks(bestsellers);
    },
    error: function (error) {},
  });
  // gets all the bestsellers found in the data.json file
  function getBestsellers(data) {
    for (const book of data.books) {
      if (book.genres.includes("Bestseller")) {
        bestsellers.push(book);
      }
    }
  }
  //creates carousel for the books using bootstrap
  const bookCarousel = new bootstrap.Carousel('#bookCarousel', {
    interval: 1000,
    touch: true
  })

  
  // creates the carousel items which will be display when a user presses the prev or next btn
  function displayBestSellingBooks(data) {
    let numOfSections = Math.ceil(bestsellers.length / numberOfDisplayedBooks);
    console.log(numOfSections);
    for (let j = 0; j <= numOfSections; j++) {
      let section = $("<div>");
      section.addClass("bookSection");
      section.addClass("carousel-item");
      if(j==0){
        section.addClass('active')
      }
      for (let i = startBooks; i <= endBooks; i++) {
        let bookDiv = $("<div>");
        bookDiv.addClass("bookCard");
        let bookImg = $("<img>");
        bookImg.prop("src", data[i].img);
        bookImg.addClass("bookImg");
        bookDiv.append(bookImg);
        let title = $("<b>").text(data[i].title);
        let author = $("<p>").html("Author: <b>" + data[i].author + "</b>");
        bookDiv.append(title);
        bookDiv.append(author);
        let innerDiv = $("<div>").html(
          "$" +
            data[i].price +
            " <div> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg> <button class='homePageBtn pinkAddBtn'>Add</button></div>"
        );
        innerDiv.addClass("innerBookDiv");
        bookDiv.append(innerDiv);
        section.append(bookDiv);
      }
      startBooks = startBooks + numberOfDisplayedBooks;
      endBooks = endBooks + numberOfDisplayedBooks;
      booksDisplay.append(section);
    }
  }
});

// This will load the content of header.html into the #navbar div
$(document).ready(function() {
  $("#header").load("Header/header.html");
});

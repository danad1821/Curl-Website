$(document).ready(function () {
  localStorage.setItem(
    "cart",
    JSON.stringify({ books: [], menuItems: [], merch: [] })
  );
  localStorage.setItem(
    "wishlist",
    JSON.stringify({ books: [], menuItems: [], merch: [] })
  );
  localStorage.setItem("book", JSON.stringify({}));

  let bestsellers = [];
  let booksDisplay = $("#booksDisplay");
  let bookC = $(".bookCard")[0];
  let numberOfDisplayedBooks = Math.floor(booksDisplay.width() / 200);
  let startBooks = 0;
  let endBooks = Math.min(numberOfDisplayedBooks - 1, 3);
  //gets data from json file
  $.ajax({
    url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      getBestsellers(data);
      displayBestSellingBooks(bestsellers);
    },
    error: function (error) { },
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
  const bookCarousel = new bootstrap.Carousel("#bookCarousel", {
    interval: 1000,
    touch: true,
  });

  // creates the carousel items which will be display when a user presses the prev or next btn
  function displayBestSellingBooks(data) {
    let numOfSections = Math.ceil(bestsellers.length / numberOfDisplayedBooks);
    console.log(numOfSections);
    for (let j = 0; j <= numOfSections; j++) {
      let section = $("<div>");
      section.addClass("bookSection");
      section.addClass("carousel-item");
      if (j == 0) {
        section.addClass("active");
      }
      for (let i = startBooks; i <= endBooks; i++) {
        let bookDiv = $("<div>");
        bookDiv.addClass("bookCard");
        let bookImg = $("<img>");
        bookImg.prop("src", data[i]?.img);
        bookImg.addClass("bookImg");
        bookDiv.append(bookImg);
        let title = $("<b>").text(data[i]?.title);
        let author = $("<p>").html("Author: <b>" + data[i]?.author + "</b>");
        bookDiv.append(title);
        bookDiv.append(author);
        let innerDiv = $("<div>").html(
          "$" +
          data[i]?.price +
          " <div> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon bookHeartIcon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg> <button class='homePageBtn pinkAddBtn'>Add</button></div>"
        );
        innerDiv.addClass("innerBookDiv");
        bookDiv.append(innerDiv);
        section.append(bookDiv);
      }
      startBooks = startBooks + numberOfDisplayedBooks;
      endBooks = endBooks + numberOfDisplayedBooks;
      booksDisplay.append(section);
    }

    // make buttons functional
    // Select all heart icons
    const bookHeartIcons = $(".bookHeartIcon");

    bookHeartIcons.click(function () {
      // Get the current wishlist data from localStorage
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
      // Get the index of the clicked book in the bestsellers array
      const clickedIndex = $(this).parent().parent().parent().index();
      //get selected book
      const selectedBook = bestsellers[clickedIndex];
      if ($(this).css("fill") !== "rgb(255, 0, 0)") {
        // Checks if the index is valid (within the bestsellers array)
        if (clickedIndex >= 0 && clickedIndex < bestsellers.length) {
          // Adds the selected book directly to the wishlist.books array
          if (!wishlist.books.includes(selectedBook)) {
            wishlist.books.push(selectedBook);
          }
          // Changes the icon color
          $(this).css({ fill: "rgb(255, 0, 0)" });
        }
      }
      else {
        // Filter wishlist.bookks to remove the selected book
        wishlist.books = wishlist.books.filter(
          (book) => book.id !== selectedBook.id
        );
        // Changes the icon color
        $(this).css({ fill: "#37474f" });
      }
      // Updates the wishlist data in localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });

    let bestsellerAddBtn = $(".pinkAddBtn");
    bestsellerAddBtn.click(function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || { books: [] };

      // Gets the index of the clicked book in the bestsellers array
      const clickedIndex = $(this).parent().parent().parent().index();
      // Gets the selected book
      const selectedBook = bestsellers[clickedIndex];

      // Finds the book in the cart (if it exists)
      const existingItem = cart.books.find(
        (book) => book.id === selectedBook.id
      );

      if (existingItem) {
        // Increases the quantity of the existing book by one
        //only by one since quanity changing isn't an option
        existingItem.quantity++;
      } else {
        // Add the book to the cart with quantity 1
        const extended = $.extend(selectedBook, { quantity: 1 });
        cart.books.push(extended);
      }
      // Updates the cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    let bookImg = $(".bookImg");
    //allows user to navigate to the page about the books by ppressng on the books image
    bookImg.click(function () {
      const clickedIndex = $(this).index();
      const selectedBook = bestsellers[clickedIndex];
      localStorage.setItem("book", JSON.stringify(selectedBook));
      $(location).prop("href", "books/book.html");
    });
  }

  // This will load the content of header.html into the #navbar div

  $("#header").load("Header/header.html");

  //code for the generation of a quote

  let quotes = [];

  // Fetch quotes from data.json
  $.getJSON("data.json", function (data) {
    quotes = data.quotes;
    loadQuote();
  });

  // Function to pick a random quote from the quotes array
  const getRandomQuote = () =>
    quotes[Math.floor(Math.random() * quotes.length)];

  const displayQuote = (quote) => {
    $("#cookie-structure p").first().text(quote.content);
    // $('#quoteDetails p').first().text(`- ${quote.author}`);
    // $('#quoteDetails p').last().text(quote.book);
    $("#quoteDetails p").first().text(`_${quote.author}, ${quote.book}`);
  };

  const loadQuote = () => {
    let storedQuote = JSON.parse(localStorage.getItem("dailyQuote"));
    let storedDate = localStorage.getItem("quoteDate"); // The date when the quote was last updated

    //function to check if 24 hours have passed since the stored date
    const isNewDay = () => {
      if (!storedDate) return true;
      let lastDate = new Date(storedDate);
      let currentDate = new Date();
      return currentDate - lastDate > 24 * 60 * 60 * 1000;
    };

    if (!storedQuote || isNewDay()) {
      let newQuote = getRandomQuote();
      displayQuote(newQuote);
      localStorage.setItem("dailyQuote", JSON.stringify(newQuote));
      localStorage.setItem("quoteDate", new Date().toISOString());
    } else {
      displayQuote(storedQuote);
    }
  };

  // Button to get another random quote
  $("#generateQuoteBtn").click(() => {
    console.log("Button clicked!");
    let newQuote = getRandomQuote();
    displayQuote(newQuote);
  });
});


// $(document).ready(function () {
//   $.getJSON("data.json", function (data) {
//     // Access the "menu" array inside the JSON data
//     const menuItems = data.menu;

//     // Check if menuItems is an array
//     if (!Array.isArray(menuItems)) {
//       console.error("Expected an array of menu items.");
//       return;
//     }

//     const menuContainer = $("#menu-items");

//     // Limit to the first 10 items
//     const firstTenItems = menuItems.slice(0, 5);

//     firstTenItems.forEach(function (item) {
//       const menuItem = createMenuItem(item);
//       menuContainer.append(menuItem);
//     });
//   }).fail(function () {
//     console.error("Error loading menu items.");
//   });
// });

// function createMenuItem(item) {
//   const itemDiv = $("<div>").addClass("menu-item");
//   const itemInfo = $("<div>").addClass("menu-info");
//   const itemName = $("<div>").addClass("item-Name");
//   const itemPrice = $("<div>").addClass("item-price");

//   const img = $("<img>").attr("src", item.img).attr("alt", item.name);
//   const name = $("<h3>").text(item.name);
//   const description = $("<p>").text(item.description);
//   const price = $("<p>").addClass("price").text(`$${item.price}`);
//   const addButton = $("<button>").addClass("add-btn homePageBtn").text("Add");

//   itemName.append(name, description);
//   itemPrice.append(price, addButton);
//   itemInfo.append(itemName, itemPrice);
//   itemDiv.append(img, itemInfo);
//   return itemDiv;
// }


$(document).ready(function () {
  // Load and display menu items
  $.getJSON('data.json', function (data) {

    //get only the 5 items on the home
    const itemsToShow = ['carrot cake', 'fruit croissant', 'iced latte', 'lemonade', 'glazed donut'];
    const menuItems = data.menu.filter(item => itemsToShow.includes(item.name.toLowerCase()));

    const $menuContainer = $('#menu-items');
    $menuContainer.empty();

    menuItems.forEach(function (item) {
      // Choosing hand image based on category
      let handImage;
      if (item.categories.includes('Pastry')) handImage = 'designImages/White shirt Hand.png';
      else if (item.categories.includes('cake')) handImage = 'designImages/Blue shirt Hand.png';
      else if (item.categories.includes('Drink')) handImage = 'designImages/Hand Pink Shirt.png';

      //HTML structure
      const itemHTML = `
        <div class="menu-item">
          <div class="image-section">
            <img src="${handImage}" alt="${item.name}" class="handImg">

             <div class="dessert-image ${item.name.toLowerCase().replace(" ", "-")}-image">
                <img src="${item.img}" alt="${item.name}" class="dessertImg" data-id="${item.name.toLowerCase()}">
            </div>
          </div>
          <div class="info-section">
            <h3>${item.name}</h3>
            <p class="item-desc">${item.description}</p>
            <div class="item-price">
              <p>$${item.price}</p>
              <div>
                <button class="homePageBtn add-btn">Add</button>
                <i class="far fa-heart"></i>
              </div>

            </div>
          </div>
        </div>
      `;

      // Append to the menu container
      $menuContainer.append(itemHTML);
    });
  }).fail(function (error) {
    console.error('Error loading menu:', error);
  });
});

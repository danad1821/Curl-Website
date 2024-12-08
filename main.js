$(document).ready(function () {
  $("#header").load("Header/header.html");

  $("#Review").load("Reviews/reviews.html");

  localStorage.setItem("selectedBook", JSON.stringify({}));

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
      getTopMerch(data);
      getBestsellers(data);
      displayBestSellingBooks(bestsellers);
      updateHeartIcons();
    },
    error: function (error) {
      console.error("Error loading data:", error);
    },
  });

  function getTopMerch(data) {
    const $container = $("#product-container");

    data.topMerch.forEach(function (individualMerch) {
      const $productDiv = $("<div>").addClass("product");

      // Product Image
      const $productImage = $("<img>")
        .attr("src", individualMerch.img)
        .attr("alt", individualMerch.name);
      $productDiv.append($productImage);

      // Product Name
      const $productName = $("<h3>").text(individualMerch.name);
      $productDiv.append($productName);

      const $addAndPriceContainer = $("<div>").addClass(
        "add-and-price-container"
      );

      // Product Price
      const $productPrice = $("<span>")
        .addClass("price")
        .text(individualMerch.price);
      $addAndPriceContainer.append($productPrice);

      // Create the white box container for "Add" section
      const $addContainer = $("<div>").addClass("add-container");

      // "Add" label
      const $addLabel = $("<span>").text("Add").addClass("add-label");

      // Minus button
      const $minusButton = $("<span>").text("-").addClass("minus-button");

      // Quantity display
      const $quantityDisplay = $("<span>").text("0").addClass("quantity");

      // Plus button
      const $plusButton = $("<span>").text("+").addClass("plus-button");

      // Heart Icon
      const $heartIcon = $(
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon merchHeartIcon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg>"
      );

      // Add event listeners for increment and decrement
      let quantity = 0;
      $minusButton.click(function () {
        if (quantity > 0) {
          quantity--;
          $quantityDisplay.text(quantity);
        }
      });

      $plusButton.click(function () {
        quantity++;
        $quantityDisplay.text(quantity);
      });

      // Append elements to addContainer
      $addContainer.append(
        $addLabel,
        $minusButton,
        $quantityDisplay,
        $plusButton
      );

      // Append all elements to addAndPriceContainer
      $addAndPriceContainer.append($productPrice, $addContainer, $heartIcon);

      // Append addAndPriceContainer and productDiv to container
      $productDiv.append($addAndPriceContainer);
      $container.append($productDiv);
    });
  }

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

  // Check and update heart icons based on wishlist items
  function updateHeartIcons() {
    let wishlist = JSON.parse(localStorage.getItem("wishData")) || {};

    $(".bookHeartIcon").each(function () {
      const clickedId = $(this).data("id");
      const heart = $(this);
      const likeIcon = $(this).siblings(".iconImg");

      if (wishlist[clickedId]) {
        heart.css("display", "none");
        likeIcon.css("display", "block");
      } else {
        heart.css("display", "block");
        likeIcon.css("display", "none");
      }
    });
  }

  // creates the carousel items which will be display when a user presses the prev or next btn
  function displayBestSellingBooks(data) {
    let numOfSections = Math.ceil(bestsellers.length / numberOfDisplayedBooks);
    console.log(numOfSections);
    for (let j = 0; j < numOfSections; j++) {
      let section = $("<div>");
      section.addClass("bookSection");
      section.addClass("carousel-item");
      if (j == 0) {
        section.addClass("active");
      }
      for (let i = startBooks; i <= endBooks; i++) {
        let bookDiv = $("<div data-id='" + data[i].id + "'>");
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
          " <div>" +
          " <div class='heart-div'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon bookHeartIcon' data-id='" + data[i].id + "'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg><img data-id='" + data[i].id + "' class='icon iconImg' src='../designImages/likedHeart.png'/></div>" +
          "<button class='homePageBtn pinkAddBtn addBestseller' data-id='" + data[i].id + "'>Add</button></div>"
        );
        innerDiv.addClass("innerBookDiv");
        bookDiv.append(innerDiv);
        section.append(bookDiv);
      }
      startBooks = startBooks + numberOfDisplayedBooks;
      endBooks = endBooks + numberOfDisplayedBooks;
      booksDisplay.append(section);
    }

    $(".bookHeartIcon").click(function () {
      // Get the current wishlist data from localStorage
      let wishlist = JSON.parse(localStorage.getItem("wishData")) || {};
      // Get the id of the clicked book
      const clickedId = $(this).data("id");
      let likeIcon = $(this).siblings();
      let heart = $(this);

      // Adds the selected book directly to the wishlist.books array
      if (!wishlist[clickedId]) {
        wishlist[clickedId] = { id: clickedId, quantity: 1 };
      }
      heart.css("display", "none");
      likeIcon.css("display", "block");
      localStorage.setItem("wishData", JSON.stringify(wishlist));
    });
    $(".iconImg").click(function () {
      // Get the current wishlist data from localStorage
      let wishlist = JSON.parse(localStorage.getItem("wishData")) || {};
      const clickedId = $(this).data("id");
      let likeIcon = $(this);
      let heart = $(this).siblings();
      if (heart.css("display") == "none") {
        // Remove the book from the wishlist
        delete wishlist[clickedId];
        heart.css("display", "block");
        likeIcon.css("display", "none");
      }
      localStorage.setItem("wishData", JSON.stringify(wishlist));
    });

    let bestsellerAddBtn = $(".pinkAddBtn");
    bestsellerAddBtn.click(function () {
      let cart = JSON.parse(localStorage.getItem("cartData")) || {};

      const clickedId = $(this).data("id");

      if (cart[clickedId]) {
        console.log("added");
        // Increases the quantity of the existing book by one
        //only by one since quanity changing isn't an option
        cart[clickedId].quantity++;
      } else {
        // Add the book to the cart with quantity 1
        const extended = { id: clickedId, quantity: 1 };
        cart[clickedId] = extended;
      }
      // Updates the cart data in localStorage
      localStorage.setItem("cartData", JSON.stringify(cart));
      console.log(JSON.parse(localStorage.getItem("cartData")))
    });

    let bookImg = $(".bookImg");
    //allows user to navigate to the page about the books by ppressng on the books image
    bookImg.click(function () {
      const clickedIndex = $(this).parent().index();
      const selectedBook = bestsellers[clickedIndex];
      localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
      $(location).prop("href", "books/book.html");
    });
  }

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
  //for create a room popup
  $("#createRoomPopup").on("shown.bs.modal", function () {
    $("#createBtn").focus();
  });

  // Load and display menu items
  $.getJSON("data.json", function (data) {
    // Get only the 5 items on the home
    const itemsToShow = [
      "carrot cake",
      "fruit croissant",
      "iced coffee",
      "lemonade",
      "glazed donut",
    ];
    const menuItems = data.menu.filter((item) =>
      itemsToShow.includes(item.name.toLowerCase())
    );

    const $menuContainer = $("#menu-items");
    $menuContainer.empty();

    // Retrieve the wishlist and cart from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishData")) || {};
    let cart = JSON.parse(localStorage.getItem("cartData")) || {};

    menuItems.forEach(function (item) {
      // Choosing hand image based on category
      let handImage;
      if (item.categories.some((cat) => cat.toLowerCase() === "pastry"))
        handImage = "designImages/White shirt Hand.png";
      else if (item.categories.some((cat) => cat.toLowerCase() === "cake"))
        handImage = "designImages/Blue shirt Hand.png";
      else if (item.categories.some((cat) => cat.toLowerCase() === "drink"))
        handImage = "designImages/Hand Pink Shirt.png";

      // Check if the item is in the wishlist
      const isInWishlist = wishlist[item.id];

      // HTML structure
      const itemHTML = `
      <div class="menu-item" data-id="${item.id}">
        <div class="image-section">
          <img src="${handImage}" alt="${item.name}" class="handImg">

           <div class="dessert-image ${item.name
          .toLowerCase()
          .replace(" ", "-")}-image">
              <img src="${item.img}" alt="${item.name
        }" class="dessertImg" data-id="${item.name.toLowerCase()}">
          </div>
        </div>
        <div class="info-section">
          <h3>${item.name}</h3>
          <p class="item-desc">${item.description}</p>
          <div class="item-price">
            <p>$${item.price}</p>
            <div>
              <button class="homePageBtn add-btn addMenuItem">Add</button>
              <i class="fa-heart add-to-wishlist ${isInWishlist ? "fas" : "far"
        }" data-id="${item.id}" style="color: ${isInWishlist ? "#e9b9b9" : ""
        };"></i>
            </div>
          </div>
        </div>
      </div>
    `;

      // Append to the menu container
      $menuContainer.append(itemHTML);
    });

    // Add item to cart functionality
    $menuContainer.on("click", ".addMenuItem", function () {
      let cart = JSON.parse(localStorage.getItem("cartData")) || {};

      // Get the id of the clicked item
      const clickedId = $(this).closest(".menu-item").data("id");

      if (cart[clickedId]) {
        // Increment the quantity if item already in cart
        cart[clickedId].quantity++;
      } else {
        // Add the item to the cart with quantity 1
        cart[clickedId] = { id: clickedId, quantity: 1 };
      }

      // Updates the cart data in localStorage
      localStorage.setItem("cartData", JSON.stringify(cart));
      console.log("Cart updated:", cart); // Debugging output
    });

    // Add to wishlist functionality
    $menuContainer.on("click", ".add-to-wishlist", function () {
      const $heartIcon = $(this);
      const itemId = $heartIcon.data("id");

      if (wishlist[itemId]) {
        // Remove from wishlist
        delete wishlist[itemId];
        $heartIcon.removeClass("fas").addClass("far"); // Change to outlined heart
        $heartIcon.css("color", ""); // Reset the color when removed from wishlist
      } else {
        // Add to wishlist
        wishlist[itemId] = { id: itemId };
        $heartIcon.removeClass("far").addClass("fas"); // Change to filled heart
        $heartIcon.css("color", "#e9b9b9"); // Set the color when added to wishlist
      }

      // Updates the wishlist data in localStorage
      localStorage.setItem("wishData", JSON.stringify(wishlist));
    });
  }).fail(function (error) {
    console.error("Error loading menu:", error);
  });



});

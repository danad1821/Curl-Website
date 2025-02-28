$(document).ready(function () {
  $("#header").load("../Header/header.html");

  // Select all links
  const links = document.querySelectorAll("ul a");
  let selectedGenres = ["Fantasy", "Romance", "Mystery"]; // Default genres
  let selectedTypes = ["book", "ebook", "audio"]; // Default to all types selected

  console.log("Initial selected genres:", selectedGenres);

  let currentBookIndexes = {}; // Tracks the current index of books for each genre


  // Function to update the selected genres container (in book top)
  function updateSelectedGenresDisplay() {
    const $selectedGenresContainer = $("#selected-genres-container");
    $selectedGenresContainer.empty();

    if (selectedGenres.length === 0) {
      $selectedGenresContainer.append("<p>No genres selected.</p>");
      return;
    }

    selectedGenres.forEach((genre) => {
      const genreTag = $(`
                <div class="selected-genre-tag">
                    <span>${genre}</span>
                    <i class="fa-regular fa-circle-xmark remove-genre" style="color: #37474f;" data-genre="${genre}"></i>                
                </div>
            `);
      $selectedGenresContainer.append(genreTag);
    });
  }

  // Load and display books categorized by genre
  $.getJSON("../data.json", function (data) {
    const genresToShow = [
      "Fantasy",
      "Mystery",
      "Romance",
      "Young Adult",
      "Comedy",
      "Thriller",
      "Family",
      "Philosophy",
      "Psychology",
      "Science-Fiction",
    ];


    const books = data.books.filter((book) =>
      book.genres.some((genre) => genresToShow.includes(genre))
    );

    const $booksContainer = $("#books-container");
    $booksContainer.empty();

    // Group books by genre
    const booksByGenre = books.reduce((acc, book) => {
      book.genres.forEach((genre) => {
        if (genresToShow.includes(genre)) {
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(book);
        }
      });
      return acc;
    }, {});



    // Initialize the slider with the range of prices
    const allPrices = books.map((book) => book.price);
    minPrice = Math.min(...allPrices);
    maxPrice = Math.max(...allPrices);

    $("#slider").slider({
      range: "min",
      min: minPrice,
      max: maxPrice,
      value: 12,
      slide: function (event, ui) {
        // Update the price range label
        console.log("Slider value: ", ui.value);
        $("#current-price").text(`$${ui.value}`);

        filterBooksByPrice(ui.value, maxPrice);
      },

      create: function (event, ui) {
        // Set the min and max price labels on the slider
        $("#min-price").text(`$${minPrice}`);
        $("#max-price").text(`$${maxPrice}`);
        $("#current-price").text(`$${12}`); // Set the initial value
      },
    });


    function filterBooksByPrice(currentMax, maxPrice) {

      //filter those books by price
      const filteredBooks = books.filter((book) => {
        return book.price >= minPrice && book.price <= currentMax;
      });

      console.log("Filtered Books by Price:", filteredBooks);

      $booksContainer.empty();

      // Group filtered books by genre again
      const booksByGenreFiltered = filteredBooks.reduce((acc, book) => {
        book.genres.forEach((genre) => {
          if (genresToShow.includes(genre)) {
            if (!acc[genre]) {
              acc[genre] = [];
            }
            acc[genre].push(book);
          }
        });
        return acc;
      }, {});

      // Recreate the carousels for the filtered books
      selectedGenres.forEach((genre) => {
        if (booksByGenreFiltered[genre] && booksByGenreFiltered[genre].length > 0) {
          createGenreCarousel(genre, booksByGenreFiltered[genre]);
        }
      });

      // update the books display for each genre
      selectedGenres.forEach((genre) => {
        if (booksByGenreFiltered[genre] && booksByGenreFiltered[genre].length > 0) {
          displayBooksForGenre(genre, booksByGenreFiltered[genre]);
        }
      });
    }


    // Function to dynamically create a genre section with a carousel
    function createGenreCarousel(genre, booksForGenre) {
      const genreDiv = $('<div class="genre-section"></div>');
      const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

      // Carousel structure
      const scrollLeft =
        $(`<div class="scroll-arrow left-arrow" data-genre="${genre}" style="display: none;">
                <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
            </div>`);
      const scrollRight =
        $(`<div class="scroll-arrow right-arrow" data-genre="${genre}" style="display: none;">
                <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
            </div>`);
      const booksList = $(
        `<div class="books-list carousel" data-genre="${genre}" data-bs-ride="carousel"></div>`
      );

      genreDiv.append(genreTitle, scrollLeft, booksList, scrollRight);
      $booksContainer.append(genreDiv);

      currentBookIndexes[genre] = 0;

      displayBooksForGenre(genre, booksForGenre);
    }

    // Function to display books for a specific genre
    function displayBooksForGenre(genre, booksForGenre) {
      const $booksList = $(`.books-list[data-genre="${genre}"]`);
      $booksList.empty();

      let cart = JSON.parse(localStorage.getItem("cartData")) || {};
      let wishlist = JSON.parse(localStorage.getItem("wishData")) || {};


      const booksToDisplay = booksForGenre.filter((book) => {
        // Check if the selectedTypes array includes any type in the book's type array
        return book.type.some((t) => selectedTypes.includes(t));
      }).slice(currentBookIndexes[genre], currentBookIndexes[genre] +
        (window.innerWidth < 584 ? 1 : window.innerWidth < 930 ? 2 : 3));


      // book card structure
      booksToDisplay.forEach(function (book) {
        const isInWishlist = wishlist[book.id];
        const bookHTML = `
            <div class="book" data-book-id="${book.id}">
                <div class="book-image">
                    <a href="book.html" class="book-link">
                        <img src="${book.img}" alt="${book.title}" class="book-img">
                    </a>
                </div>
                <div class="book-info">
                    <div class="book-details">
                        <a href="book.html" class="book-link">
                            <p>${book.title}</p>
                        </a>
                        <p class="book-author">Author: <span>${book.author}</span></p>
                    </div>
                    <div class="price-div">
                        <p class="book-price">$${book.price}</p>
                        <div>
                            <i class="fa-heart add-to-wishlist ${isInWishlist ? 'fas' : 'far'}" style="color: ${isInWishlist ? '#e9b9b9' : ''};"></i>


                            <button class="add-to-cart-btn">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $booksList.append(bookHTML);
      });

      $booksList.find(".book").click(function (e) {
        e.stopPropagation();
        const bookId = $(this).data("book-id");
        const bookData = booksForGenre.find((book) => book.id === bookId);

        localStorage.setItem("selectedBook", JSON.stringify(bookData));

        // Redirect to the book details page
        window.location.href = "book.html";
      });


      // Click event to toggle wishlist
      $booksList.find(".add-to-wishlist").click(function (e) {
        e.stopPropagation();
        const $heartIcon = $(this);
        const bookId = $(this).closest(".book").data("book-id");
        const bookData = booksForGenre.find((book) => book.id === bookId);

        // Toggle the wishlist state
        const isInWishlist = wishlist[bookData.id];
        if (isInWishlist) {
          // Remove from wishlist
          delete wishlist[bookData.id];
          $heartIcon.removeClass("fas").addClass("far");
          $heartIcon.css("color", ""); // reset the color when removed from wishlist

        } else {
          // Add to wishlist
          wishlist[bookData.id] = bookData;
          $heartIcon.removeClass("far").addClass("fas");
          $heartIcon.css("color", "#e9b9b9"); // set the color when added to wishlist

        }

        // Save updated wishlist to localStorage
        localStorage.setItem("wishData", JSON.stringify(wishlist));
      });


      // Click event to add to cart
      $booksList.find(".add-to-cart-btn").click(function (e) {
        e.stopPropagation();
        const bookId = $(this).closest(".book").data("book-id");
        const bookData = booksForGenre.find((book) => book.id === bookId);

        // check if the book is already in the cart
        const existingItem = cart[bookData.id];

        if (existingItem) {
          // If the book is already in the cart, increase the quantity by 1
          existingItem.quantity++;
        } else {
          // If the book isn't in the cart, add it with a quantity of 1
          bookData.quantity = 1;
          cart[bookData.id] = bookData;
        }

        localStorage.setItem("cartData", JSON.stringify(cart));
      });

      // Show or hide arrows depending on the total number of books
      const totalBooks = booksForGenre.length;
      const $leftArrow = $(`.left-arrow[data-genre="${genre}"]`);
      const $rightArrow = $(`.right-arrow[data-genre="${genre}"]`);

      if (currentBookIndexes[genre] > 0) {
        $leftArrow.show();
      } else {
        $leftArrow.hide();
      }

      if (currentBookIndexes[genre] + 3 < totalBooks) {
        $rightArrow.show();
      } else {
        $rightArrow.hide();
      }
    }



    // Function to display selected genres
    function displayGenres() {
      $booksContainer.empty();

      selectedGenres.forEach((genre) => {
        if (booksByGenre[genre]) {
          createGenreCarousel(genre, booksByGenre[genre]);
        }
      });
    }

    // Initial display of default genres
    displayGenres();
    updateSelectedGenresDisplay();

    // Preselect default genres and apply the 'active' class
    $("#Genre a").each(function () {
      const genre = $(this).text();
      if (selectedGenres.includes(genre)) {
        $(this).addClass("active"); // Apply the active class for default genres
      }
    });


    // Handle genre link clicks
    $("#Genre a").click(function (e) {
      e.preventDefault();

      const genre = $(this).text(); // Get the genre from the link text

      // If the genre is already selected, remove it; otherwise, add it
      if (selectedGenres.includes(genre)) {

        selectedGenres = selectedGenres.filter((g) => g !== genre);
        $(this).removeClass("active");
      } else if (selectedGenres.length < 3) {
        selectedGenres.push(genre);
        $(this).addClass("active");
      }
      console.log("SELECTED GENRES inside function:", selectedGenres)

      // Display books for selected genres
      displayGenres();
      updateSelectedGenresDisplay();

      // Disable further genre selection if 3 genres are selected
      if (selectedGenres.length === 3) {
        $("#Genre a").not(".active").css("pointer-events", "none");
      } else {
        $("#Genre a").css("pointer-events", "auto");
      }
    });

    // Initialize the active class for type links based on selectedTypes
    $('.filter-link').each(function () {
      const selectedType = $(this).data('type');
      if (selectedTypes.includes(selectedType)) {
        $(this).addClass('active');
      }
    });

    // type selection clicks
    $('.filter-link').click(function (e) {
      e.preventDefault();
      const selectedType = $(this).data('type');

      // Toggle the selected type in the array
      if (selectedTypes.includes(selectedType)) {
        // Remove the selected type from the array if it's already there
        selectedTypes = selectedTypes.filter(type => type !== selectedType);
        $(this).removeClass('active');

      } else {
        // Add the selected type to the array if it's not already there
        selectedTypes.push(selectedType);
        $(this).addClass('active');

      }

      console.log("Updated Selected Types: ", selectedTypes);

      // Re-render books for all genres with the updated selected types
      $booksContainer.empty();
      selectedGenres.forEach((genre) => {
        if (booksByGenre[genre] && booksByGenre[genre].length > 0) {
          createGenreCarousel(genre, booksByGenre[genre]);
          displayBooksForGenre(genre, booksByGenre[genre]);
        }
      });
    });

    // Arrow functionality for scrolling books
    $booksContainer.on("click", ".left-arrow", function () {
      const genre = $(this).data("genre");
      if (currentBookIndexes[genre] > 0) {
        currentBookIndexes[genre] -= 3;
        displayBooksForGenre(genre, booksByGenre[genre]);
      }
    });

    $booksContainer.on("click", ".right-arrow", function () {
      const genre = $(this).data("genre");
      const totalBooks = booksByGenre[genre].length;
      if (currentBookIndexes[genre] + 3 < totalBooks) {
        currentBookIndexes[genre] += 3;
        displayBooksForGenre(genre, booksByGenre[genre]);
      }
    });

    // removing genres
    $("#selected-genres-container").on("click", ".remove-genre", function () {
      const genre = $(this).data("genre");

      selectedGenres = selectedGenres.filter((g) => g !== genre);
      $(`#Genre a:contains(${genre})`).removeClass("active");
      $("#Genre a").css("pointer-events", "auto");

      displayGenres();
      updateSelectedGenresDisplay();
    });



    //sort popup toggle
    $("#sort-btn").click(function (e) {
      e.stopPropagation();
      $("#sort-popup").toggle();
    });

    // Hide the popup when clicking outside of it
    $(document).click(function () {
      $("#sort-popup").hide();
    });

    // Prevent the popup from closing when clicking inside it
    $("#sort-popup").click(function (e) {
      e.stopPropagation(); // Prevent the document click from closing popup
    });

    // Add event listener for sort options
    $(".sort-option").on("click", function () {
      const sortOption = $(this).data("sort"); // Get the selected sort option

      // Looping through each selected genre and sort the books for that genre
      selectedGenres.forEach((genre) => {
        // Checking if books exist for this genre
        if (booksByGenre[genre]) {
          console.log("Sorting genre:", genre);

          // Sorting the books for this genre based on the selected option
          booksByGenre[genre] = sortBooks(booksByGenre[genre], sortOption);

          // Re-display the books for the genre in the carousel
          currentBookIndexes[genre] = 0;
          displayBooksForGenre(genre, booksByGenre[genre]);
        }
      });
    });

    // Function to sort books based on the selected option
    function sortBooks(books, sortOption) {
      switch (sortOption) {
        case "new-to-old":
          return books.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
        case "old-to-new":
          return books.sort((a, b) => new Date(a.publication_date) - new Date(b.publication_date));
        case "high-to-low":
          return books.sort((a, b) => b.price - a.price);
        case "low-to-high":
          return books.sort((a, b) => a.price - b.price);
        default:
          return books;
      }
    }
  }).fail(function (error) {
    console.error("Error loading books:", error);
  });




  // Search function
  const $searchSortDiv = $("#search-sort");
  const $searchResults = $("#search-results");
  let booksData = [];

  // Load books data from data.json
  $.ajax({
    url: "../data.json",
    method: "GET",
    dataType: "json",
    success: function (jsonData) {
      booksData = jsonData.books || []; // Load only books data
    },
    error: function (xhr, status, error) {
      console.error("Error loading books data:", error);
    },
  });

  // Replace the Search button with an input field when clicked
  $searchSortDiv.on("click", "button:first-child", function (e) {
    e.preventDefault();

    // Create the search input dynamically
    const $searchInput = $(
      `<input type="text" class="search-input" placeholder="Search for books..." autocomplete="off">`
    );

    // Replace the button with the search input
    $(this).replaceWith($searchInput);

    // Focus on the input field
    $searchInput.focus();

    // Handle user input in the search field
    $searchInput.on("input", function () {
      const query = $searchInput.val().toLowerCase().trim();

      // Clear results if query is empty
      if (!query) {
        $searchResults.empty();
        return;
      }

      // Filter books based on the query
      const filteredResults = booksData.filter((book) => {
        return (
          (book.title && book.title.toLowerCase().includes(query)) ||
          (book.author && book.author.toLowerCase().includes(query)) ||
          (book.genres &&
            book.genres.some((genre) => genre.toLowerCase().includes(query)))
        );
      });

      // Render the filtered results
      $searchResults.empty();
      filteredResults.forEach((book) => {
        const $listItem = $("<li>").addClass("search-item");
        const imgElement = book.img
          ? `<img src="${book.img}" alt="Book image" class="search-image">`
          : "";
        const title = book.title || "Untitled";
        const description = truncateText(
          book.summary || "No description available."
        );
        const author = book.author ? `Author: ${book.author}` : "";

        $listItem.append(
          imgElement,
          `<div class="text-container">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            ${author
            ? `<p class="author-name">${author}</p>`
            : ""
          }
                    </div>`
        );

        $listItem.data("book", book);


        $searchResults.append($listItem);
      });
      $(".search-item").click(function () {
        const book = $(this).data("book"); // Retrieve the book data from the clicked item
        if (book) {
          console.log("Book clicked:", book);
          localStorage.setItem("selectedBook", JSON.stringify(book));
          $(location).prop("href", "book.html");
        }
      });
    });

    // Close search results and input when clicking outside
    $(document).on("mousedown", function (event) {
      if (
        !$(event.target).closest($searchInput).length &&
        !$(event.target).closest($searchResults).length
      ) {
        // Replace the input with the original Search button
        const $newButton = $(
          `<button>Search <i class="fa-solid fa-magnifying-glass" style="color: #f1eae4;"></i></button>`
        );

        $searchInput.replaceWith($newButton);
        $searchResults.empty();

        // Rebind the button click handler to repeat the process
        $newButton.on("click", function (e) {
          e.preventDefault();
          $searchSortDiv.find("button:first-child").trigger("click");
        });

        // Unbind the mousedown event to avoid duplicate bindings
        $(document).off("mousedown");
      }
    });
  });

  // Helper function to truncate text
  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    }
    return text;
  }

});


$(document).ready(function () {
  // Checks the screen width and enables swipe functionality for small screens
  const enableSwipe = () => {
    if (window.innerWidth <= 400) {
      $(".books-list").each(function () {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events
        $(this)
          .on("mousedown", function (e) {
            isDown = true;
            $(this).addClass("active");
            startX = e.pageX - $(this).offset().left;
            scrollLeft = $(this).scrollLeft();
          })
          .on("mouseleave mouseup", function () {
            isDown = false;
            $(this).removeClass("active");
          })
          .on("mousemove", function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - $(this).offset().left;
            const walk = (x - startX) * 2; // scroll speed
            $(this).scrollLeft(scrollLeft - walk);
          });

        // Touch events
        let startTouchX;
        let startScrollLeft;

        $(this)
          .on("touchstart", function (e) {
            startTouchX = e.originalEvent.touches[0].pageX;
            startScrollLeft = $(this).scrollLeft();
          })
          .on("touchmove", function (e) {
            const touchX = e.originalEvent.touches[0].pageX;
            const walk = (startTouchX - touchX) * 1.5; //scroll speed
            $(this).scrollLeft(startScrollLeft + walk);
          });
      });
    }
  };

  //initializing swipe function
  enableSwipe();
  $(window).resize(enableSwipe);
});

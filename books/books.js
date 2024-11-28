$(document).ready(function () {
  $("#header").load("../Header/header.html");

  // Select all links
  const links = document.querySelectorAll("ul a");
  let selectedTypes = null;
  let selectedGenres = ["Fantasy", "Romance", "Mystery"]; // Default genres
  let currentBookIndexes = {}; // Tracks the current index of books for each genre

  //Color links when selected
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of links

      // Toggle the 'active' class
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        this.classList.add("active");
      }
    });
  });

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
    let selectedTypes = [];
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
        // $("#price-range").text(`$${ui.values[0]} - $${ui.values[1]}`);
        $("#current-price").text(`$${ui.value}`);

        // Update displayed books based on the new price range
        filterBooksByPrice(ui.value, maxPrice);
      },

      create: function (event, ui) {
        // Set the min and max price labels on the slider
        $("#min-price").text(`$${minPrice}`);
        $("#max-price").text(`$${maxPrice}`);
        $("#current-price").text(`$${12}`); // Set the initial value
      },
    });

    //Filter books by price
    function filterBooksByPrice(currentMax, maxPrice) {
      console.log(books);
      // Filter books whose price is <= currentMax
      const filteredBooks = books.filter((book) => book.price <= currentMax);

      console.log("filtered", filteredBooks);
      // Group filtered books by genre
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

      // Clear and display filtered books
      $booksContainer.empty();

      selectedGenres.forEach((genre) => {
        if (
          booksByGenreFiltered[genre] &&
          booksByGenreFiltered[genre].length > 0
        ) {
          createGenreCarousel(genre, booksByGenreFiltered[genre]);
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

      // Initialize the current index for this genre
      currentBookIndexes[genre] = 0;

      displayBooksForGenre(genre, booksForGenre);
    }

    // Function to display books for a specific genre
    function displayBooksForGenre(genre, booksForGenre) {
      const $booksList = $(`.books-list[data-genre="${genre}"]`);
      $booksList.empty();

      const cart = JSON.parse(localStorage.getItem("cart")) || { books: [], menuItems: [], merch: [] };
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || { books: [], menuItems: [], merch: [] };

      const booksToDisplay = booksForGenre.slice(
        currentBookIndexes[genre],
        currentBookIndexes[genre] + 3 // Show 3 books at a time
      );

      booksToDisplay.forEach(function (book) {
        // const isInWishlist = wishlist.books.some(b => b.id === book.id);
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
                                    <i class="far fa-heart add-to-wishlist"></i>
                                    <button class="add-to-cart-btn">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        $booksList.append(bookHTML);
      });

      // Add a click event to the book to store information and redirect
      $booksList.find(".book").click(function (e) {
        e.stopPropagation(); // Prevent the click from bubbling up to the parent book div
        const bookId = $(this).data("book-id");
        const bookData = booksForGenre.find((book) => book.id === bookId);

        // Store the book data in localStorage
        localStorage.setItem("selectedBook", JSON.stringify(bookData));

        // Redirect to the book details page
        window.location.href = "book.html";
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

      // Ensure the selectedGenres array includes the default genres
      if (!selectedGenres.includes(genre)) {
        selectedGenres.push(genre);
      }
    });
    // Handle genre link clicks
    $("#Genre a").click(function (e) {
      e.preventDefault();

      const genre = $(this).text(); // Get the genre from the link text

      // If the genre is already selected, remove it; otherwise, add it
      if (selectedGenres.includes(genre)) {
        selectedGenres = selectedGenres.filter((g) => g !== genre);
        $(this).removeClass("active"); // Remove active class if unselected
      } else if (selectedGenres.length < 3) {
        selectedGenres.push(genre);
        $(this).addClass("active"); // Add active class if newly selected
      }

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

    // Handle removing genres from selected container
    $("#selected-genres-container").on("click", ".remove-genre", function () {
      const genre = $(this).data("genre");

      selectedGenres = selectedGenres.filter((g) => g !== genre);
      $(`#Genre a:contains(${genre})`).removeClass("active");
      $("#Genre a").css("pointer-events", "auto");

      displayGenres();
      updateSelectedGenresDisplay();
    });
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
                            ${
                              author
                                ? `<p class="author-name">${author}</p>`
                                : ""
                            }
                    </div>`
        );

        // Add the book's data to a custom data attribute for identification
        $listItem.data("book", book);
        // Use event delegation for dynamic elements
        

        $searchResults.append($listItem);
      });
      $(".search-item").click(function () {
        const book = $(this).data("book"); // Retrieve the book data from the clicked item
        if (book) {
          console.log("Book clicked:", book); // Debugging: Confirm click event
          localStorage.setItem("selectedBook", JSON.stringify(book));
          $(location).prop("href","book.html") ;
        }
      });
    });

    // // Replace input with the original Search button on blur
    // $searchInput.on("blur", function () {
    //   const $newButton = $(
    //     `<button>Search <i class="fa-solid fa-magnifying-glass" style="color: #f1eae4;"></i></button>`
    //   );

    //   // Hide the search results when the input loses focus
    //   $searchResults.empty();

    //   // Replace the input field with the button
    //   $(this).replaceWith($newButton);

    //   // Rebind the button click handler to repeat the process
    //   $newButton.on("click", function (e) {
    //     e.preventDefault();
    //     $searchSortDiv.find("button:first-child").trigger("click");
    //   });
    // });
  });

  // Helper function to truncate text
  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    }
    return text;
  }
  const $booksContainer = $("#books-container");

  // Show the sort popup when the "Sort By" button is clicked
  $("#sort-btn").click(function (e) {
    e.preventDefault();
    $("#sort-popup").toggle(); // Toggle visibility of the popup
  });

  // Hide the sort popup when clicking outside of it
  $(document).click(function (e) {
    if (!$(e.target).closest("#sort-popup, #sort-btn").length) {
      $("#sort-popup").hide(); // Hide the sort popup if clicked outside
    }
  });

  // Handle sorting options
  $(".sort-option").click(function () {
    const sortType = $(this).data("sort");
    $("#sort-popup").hide(); // Hide the popup after selection

    // Get the list of books displayed in the container
    const books = $booksContainer.children(".book").get(); // Get all book elements

    // Sort the book elements based on the selected option
    switch (sortType) {
      case "new-to-old":
        books.sort((a, b) => {
          const dateA = new Date($(a).find(".book-info p:last").text()); // Extract date from the book info
          const dateB = new Date($(b).find(".book-info p:last").text());
          return dateB - dateA; // Sort by date descending
        });
        break;
      case "old-to-new":
        books.sort((a, b) => {
          const dateA = new Date($(a).find(".book-info p:last").text());
          const dateB = new Date($(b).find(".book-info p:last").text());
          return dateA - dateB; // Sort by date ascending
        });
        break;
      case "high-to-low":
        books.sort((a, b) => {
          const priceA = parseFloat(
            $(a).find(".book-info p:first").text().replace("Price: $", "")
          );
          const priceB = parseFloat(
            $(b).find(".book-info p:first").text().replace("Price: $", "")
          );
          return priceB - priceA; // Sort by price descending
        });
        break;
      case "low-to-high":
        books.sort((a, b) => {
          const priceA = parseFloat(
            $(a).find(".book-info p:first").text().replace("Price: $", "")
          );
          const priceB = parseFloat(
            $(b).find(".book-info p:first").text().replace("Price: $", "")
          );
          return priceA - priceB; // Sort by price ascending
        });
        break;
      default:
        break;
    }

    // Reorder the book elements in the DOM based on the sorted array
    $booksContainer.append(books); // Append the sorted books back to the container
  });
});

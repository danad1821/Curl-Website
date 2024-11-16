$(document).ready(function () {
    $("#header").load("../Header/header.html");

    // Select all links
    const links = document.querySelectorAll("ul a");

    links.forEach(link => {
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

});

$(document).ready(function () {
    // Load and display books categorized by genre
    $.getJSON("../data.json", function (data) {
        const genresToShow = ["Fantasy", "Mystery"]; // Genres you want to show
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

        // Loop through each genre and display the books
        for (let genre in booksByGenre) {
            if (booksByGenre.hasOwnProperty(genre)) {
                // Create a section for the genre
                const genreDiv = $('<div class="genre-section"></div>');
                const genreTitle = $('<h3></h3>').text(genre);
                const booksContainer = $('<div class="books-list"></div>');

                // Loop through each book in the genre
                booksByGenre[genre].forEach(function (book) {
                    // HTML structure for each book
                    const bookHTML = `
              <div class="book">
                <div class="book-image">
                  <img src="${book.img}" alt="${book.title}" class="book-img">
                </div>
                <div class="book-info">
                  <div class="book-details">
                      <p>${book.title}</p>
                      <p class="book-author">Author: <span>${book.author}</span></p>
                  </div>
                  <div class="price-div">
                      <p class="book-price">$${book.price}</p>
                      <button class="add-to-cart-btn">Add</button>
                  </div>
                </div>
              </div>
            `;

                    // Append book to the books list container
                    booksContainer.append(bookHTML);
                });

                // Append genre title and book container to the genre section
                genreDiv.append(genreTitle, booksContainer);
                $booksContainer.append(genreDiv);
            }
        }
    }).fail(function (error) {
        console.error("Error loading books:", error);
    });
});





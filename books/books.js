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


// $(document).ready(function () {
//     let selectedGenres = [];
//     let currentBookIndexes = {}; // Tracks the current index of books for each genre

//     // Load and display books categorized by genre
//     $.getJSON("../data.json", function (data) {
//         const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
//         const books = data.books.filter((book) =>
//             book.genres.some((genre) => genresToShow.includes(genre))
//         );

//         const $booksContainer = $("#books-container");
//         $booksContainer.empty(); // Clear any existing content

//         // Group books by genre
//         const booksByGenre = books.reduce((acc, book) => {
//             book.genres.forEach((genre) => {
//                 if (genresToShow.includes(genre)) {
//                     if (!acc[genre]) {
//                         acc[genre] = [];
//                     }
//                     acc[genre].push(book);
//                 }
//             });
//             return acc;
//         }, {});

//         // Function to dynamically create a genre section with a carousel
//         function createGenreCarousel(genre) {
//             const genreDiv = $('<div class="genre-section"></div>');
//             const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

//             // Carousel structure
//             const scrollLeft = $(`<div class="scroll-arrow left-arrow" data-genre="${genre}" style="display: none;">
//                 <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
//             </div>`);
//             const scrollRight = $(`<div class="scroll-arrow right-arrow" data-genre="${genre}" style="display: none;">
//                 <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
//             </div>`);
//             const booksList = $(`<div class="books-list carousel" data-genre="${genre}"></div>`);

//             genreDiv.append(genreTitle, scrollLeft, booksList, scrollRight);
//             $booksContainer.append(genreDiv);

//             // Initialize the current index for this genre
//             currentBookIndexes[genre] = 0;

//             displayBooksForGenre(genre);
//         }

//         // Function to display books for a specific genre
//         function displayBooksForGenre(genre) {
//             const $booksList = $(`.books-list[data-genre="${genre}"]`);
//             $booksList.empty(); // Clear any existing books

//             const booksToDisplay = booksByGenre[genre].slice(
//                 currentBookIndexes[genre],
//                 currentBookIndexes[genre] + 3 // Show 3 books at a time
//             );

//             booksToDisplay.forEach(function (book) {
//                 const bookHTML = `
//                     <div class="book">
//                         <div class="book-image">
//                             <img src="${book.img}" alt="${book.title}" class="book-img">
//                         </div>
//                         <div class="book-info">
//                             <div class="book-details">
//                                 <p>${book.title}</p>
//                                 <p class="book-author">Author: <span>${book.author}</span></p>
//                             </div>
//                             <div class="price-div">
//                                 <p class="book-price">$${book.price}</p>
//                                 <div>
//                                     <i class="far fa-heart"></i>
//                                     <button class="add-to-cart-btn">Add</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 $booksList.append(bookHTML);
//             });

//             // Show or hide arrows depending on the total number of books
//             const totalBooks = booksByGenre[genre].length;
//             const $leftArrow = $(`.left-arrow[data-genre="${genre}"]`);
//             const $rightArrow = $(`.right-arrow[data-genre="${genre}"]`);

//             if (currentBookIndexes[genre] > 0) {
//                 $leftArrow.show();
//             } else {
//                 $leftArrow.hide();
//             }

//             if (currentBookIndexes[genre] + 3 < totalBooks) {
//                 $rightArrow.show();
//             } else {
//                 $rightArrow.hide();
//             }
//         }

//         // Function to display selected genres
//         function displayGenres() {
//             $booksContainer.empty(); // Clear any existing content

//             selectedGenres.forEach((genre) => {
//                 if (booksByGenre[genre]) {
//                     createGenreCarousel(genre);
//                 }
//             });
//         }

//         // Handle genre link clicks
//         $('#Genre a').click(function (e) {
//             e.preventDefault(); // Prevent page reload

//             const genre = $(this).text(); // Get the genre from the link text

//             // If the genre is already selected, remove it; otherwise, add it
//             if (selectedGenres.includes(genre)) {
//                 selectedGenres = selectedGenres.filter((g) => g !== genre);
//                 $(this).css('color', ''); // Reset color if removed
//             } else if (selectedGenres.length < 3) {
//                 selectedGenres.push(genre);
//             }

//             // Display books for selected genres
//             displayGenres();

//             // Disable further genre selection if 3 genres are selected
//             if (selectedGenres.length === 3) {
//                 $('#Genre a').not(':contains(' + selectedGenres.join('), :contains(') + ')').css('pointer-events', 'none');
//             } else {
//                 $('#Genre a').css('pointer-events', 'auto');
//             }
//         });

//         // Arrow functionality for scrolling books
//         $booksContainer.on('click', '.left-arrow', function () {
//             const genre = $(this).data('genre');
//             if (currentBookIndexes[genre] > 0) {
//                 currentBookIndexes[genre] -= 3;
//                 displayBooksForGenre(genre);
//             }
//         });

//         $booksContainer.on('click', '.right-arrow', function () {
//             const genre = $(this).data('genre');
//             const totalBooks = booksByGenre[genre].length;
//             if (currentBookIndexes[genre] + 3 < totalBooks) {
//                 currentBookIndexes[genre] += 3;
//                 displayBooksForGenre(genre);
//             }
//         });

//     }).fail(function (error) {
//         console.error("Error loading books:", error);
//     });

// });





// $(document).ready(function () {
//     let selectedGenres = ["Fantasy", "Romance", "Mystery"]; // Default genres
//     let currentBookIndexes = {}; // Tracks the current index of books for each genre

//     // Load and display books categorized by genre
//     $.getJSON("../data.json", function (data) {
//         const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
//         const books = data.books.filter((book) =>
//             book.genres.some((genre) => genresToShow.includes(genre))
//         );

//         const $booksContainer = $("#books-container");
//         $booksContainer.empty(); // Clear any existing content

//         // Group books by genre
//         const booksByGenre = books.reduce((acc, book) => {
//             book.genres.forEach((genre) => {
//                 if (genresToShow.includes(genre)) {
//                     if (!acc[genre]) {
//                         acc[genre] = [];
//                     }
//                     acc[genre].push(book);
//                 }
//             });
//             return acc;
//         }, {});

//         // Function to dynamically create a genre section with a carousel
//         function createGenreCarousel(genre) {
//             const genreDiv = $('<div class="genre-section"></div>');
//             const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

//             // Carousel structure
//             const scrollLeft = $(`<div class="scroll-arrow left-arrow" data-genre="${genre}" style="display: none;">
//                 <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
//             </div>`);
//             const scrollRight = $(`<div class="scroll-arrow right-arrow" data-genre="${genre}" style="display: none;">
//                 <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
//             </div>`);
//             const booksList = $(`<div class="books-list carousel" data-genre="${genre}"></div>`);

//             genreDiv.append(genreTitle, scrollLeft, booksList, scrollRight);
//             $booksContainer.append(genreDiv);

//             // Initialize the current index for this genre
//             currentBookIndexes[genre] = 0;

//             displayBooksForGenre(genre);
//         }

//         // Function to display books for a specific genre
//         function displayBooksForGenre(genre) {
//             const $booksList = $(`.books-list[data-genre="${genre}"]`);
//             $booksList.empty(); // Clear any existing books

//             const booksToDisplay = booksByGenre[genre].slice(
//                 currentBookIndexes[genre],
//                 currentBookIndexes[genre] + 3 // Show 3 books at a time
//             );

//             booksToDisplay.forEach(function (book) {
//                 const bookHTML = `
//                     <div class="book">
//                         <div class="book-image">
//                             <img src="${book.img}" alt="${book.title}" class="book-img">
//                         </div>
//                         <div class="book-info">
//                             <div class="book-details">
//                                 <p>${book.title}</p>
//                                 <p class="book-author">Author: <span>${book.author}</span></p>
//                             </div>
//                             <div class="price-div">
//                                 <p class="book-price">$${book.price}</p>
//                                 <div>
//                                     <i class="far fa-heart"></i>
//                                     <button class="add-to-cart-btn">Add</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 $booksList.append(bookHTML);
//             });

//             // Show or hide arrows depending on the total number of books
//             const totalBooks = booksByGenre[genre].length;
//             const $leftArrow = $(`.left-arrow[data-genre="${genre}"]`);
//             const $rightArrow = $(`.right-arrow[data-genre="${genre}"]`);

//             if (currentBookIndexes[genre] > 0) {
//                 $leftArrow.show();
//             } else {
//                 $leftArrow.hide();
//             }

//             if (currentBookIndexes[genre] + 3 < totalBooks) {
//                 $rightArrow.show();
//             } else {
//                 $rightArrow.hide();
//             }
//         }

//         // Function to display selected genres
//         function displayGenres() {
//             $booksContainer.empty(); // Clear any existing content

//             selectedGenres.forEach((genre) => {
//                 if (booksByGenre[genre]) {
//                     createGenreCarousel(genre);
//                 }
//             });
//         }

//         // Initial display of default genres
//         displayGenres();

//         // Preselect default genres and apply the 'active' class
//         $('#Genre a').each(function () {
//             const genre = $(this).text();
//             if (selectedGenres.includes(genre)) {
//                 $(this).addClass('active'); // Apply the active class for default genres
//             }
//         });

//         // Handle genre link clicks
//         $('#Genre a').click(function (e) {
//             e.preventDefault(); // Prevent page reload

//             const genre = $(this).text(); // Get the genre from the link text

//             // If the genre is already selected, remove it; otherwise, add it
//             if (selectedGenres.includes(genre)) {
//                 selectedGenres = selectedGenres.filter((g) => g !== genre);
//                 $(this).removeClass('active'); // Remove active class if unselected
//             } else if (selectedGenres.length < 3) {
//                 selectedGenres.push(genre);
//                 $(this).addClass('active'); // Add active class if newly selected
//             }

//             // Display books for selected genres
//             displayGenres();

//             // Disable further genre selection if 3 genres are selected
//             if (selectedGenres.length === 3) {
//                 $('#Genre a').not('.active').css('pointer-events', 'none');
//             } else {
//                 $('#Genre a').css('pointer-events', 'auto');
//             }
//         });

//         // Arrow functionality for scrolling books
//         $booksContainer.on('click', '.left-arrow', function () {
//             const genre = $(this).data('genre');
//             if (currentBookIndexes[genre] > 0) {
//                 currentBookIndexes[genre] -= 3;
//                 displayBooksForGenre(genre);
//             }
//         });

//         $booksContainer.on('click', '.right-arrow', function () {
//             const genre = $(this).data('genre');
//             const totalBooks = booksByGenre[genre].length;
//             if (currentBookIndexes[genre] + 3 < totalBooks) {
//                 currentBookIndexes[genre] += 3;
//                 displayBooksForGenre(genre);
//             }
//         });

//     }).fail(function (error) {
//         console.error("Error loading books:", error);
//     });

// });



$(document).ready(function () {
    let selectedGenres = ["Fantasy", "Romance", "Mystery"]; // Default genres
    let currentBookIndexes = {}; // Tracks the current index of books for each genre
    let minPrice = 0, maxPrice = 100; // Default price range (you can adjust these based on your data)

    // Load and display books categorized by genre
    $.getJSON("../data.json", function (data) {
        const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
        const books = data.books.filter((book) =>
            book.genres.some((genre) => genresToShow.includes(genre))
        );

        const $booksContainer = $("#books-container");
        $booksContainer.empty(); // Clear any existing content

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
        const allPrices = books.map(book => book.price);
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
                $("#current-price").text(`$${12}`);  // Set the initial value
            }
        });

        // Function to filter books by price
        function filterBooksByPrice(min, max) {
            const filteredBooks = books.filter((book) =>
                book.price >= min && book.price <= max
            );

            // Recreate the book display with filtered results
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

            // Clear existing content and display filtered books
            $booksContainer.empty();
            selectedGenres.forEach((genre) => {
                if (booksByGenreFiltered[genre]) {
                    createGenreCarousel(genre, booksByGenreFiltered[genre]);
                }
            });
        }

        // Function to dynamically create a genre section with a carousel
        function createGenreCarousel(genre, booksForGenre) {
            const genreDiv = $('<div class="genre-section"></div>');
            const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

            // Carousel structure
            const scrollLeft = $(`<div class="scroll-arrow left-arrow" data-genre="${genre}" style="display: none;">
                <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
            </div>`);
            const scrollRight = $(`<div class="scroll-arrow right-arrow" data-genre="${genre}" style="display: none;">
                <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
            </div>`);
            const booksList = $(`<div class="books-list carousel" data-genre="${genre}"></div>`);

            genreDiv.append(genreTitle, scrollLeft, booksList, scrollRight);
            $booksContainer.append(genreDiv);

            // Initialize the current index for this genre
            currentBookIndexes[genre] = 0;

            displayBooksForGenre(genre, booksForGenre);
        }

        // Function to display books for a specific genre
        function displayBooksForGenre(genre, booksForGenre) {
            const $booksList = $(`.books-list[data-genre="${genre}"]`);
            $booksList.empty(); // Clear any existing books

            const booksToDisplay = booksForGenre.slice(
                currentBookIndexes[genre],
                currentBookIndexes[genre] + 3 // Show 3 books at a time
            );

            booksToDisplay.forEach(function (book) {
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
                                <div>
                                    <i class="far fa-heart"></i>
                                    <button class="add-to-cart-btn">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $booksList.append(bookHTML);
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
            $booksContainer.empty(); // Clear any existing content

            selectedGenres.forEach((genre) => {
                if (booksByGenre[genre]) {
                    createGenreCarousel(genre, booksByGenre[genre]);
                }
            });
        }

        // Initial display of default genres
        displayGenres();

        // Preselect default genres and apply the 'active' class
        $('#Genre a').each(function () {
            const genre = $(this).text();
            if (selectedGenres.includes(genre)) {
                $(this).addClass('active'); // Apply the active class for default genres
            }
        });

        // Handle genre link clicks
        $('#Genre a').click(function (e) {
            e.preventDefault(); // Prevent page reload

            const genre = $(this).text(); // Get the genre from the link text

            // If the genre is already selected, remove it; otherwise, add it
            if (selectedGenres.includes(genre)) {
                selectedGenres = selectedGenres.filter((g) => g !== genre);
                $(this).removeClass('active'); // Remove active class if unselected
            } else if (selectedGenres.length < 3) {
                selectedGenres.push(genre);
                $(this).addClass('active'); // Add active class if newly selected
            }

            // Display books for selected genres
            displayGenres();

            // Disable further genre selection if 3 genres are selected
            if (selectedGenres.length === 3) {
                $('#Genre a').not('.active').css('pointer-events', 'none');
            } else {
                $('#Genre a').css('pointer-events', 'auto');
            }
        });

        // Arrow functionality for scrolling books
        $booksContainer.on('click', '.left-arrow', function () {
            const genre = $(this).data('genre');
            if (currentBookIndexes[genre] > 0) {
                currentBookIndexes[genre] -= 3;
                displayBooksForGenre(genre, booksByGenre[genre]);
            }
        });

        $booksContainer.on('click', '.right-arrow', function () {
            const genre = $(this).data('genre');
            const totalBooks = booksByGenre[genre].length;
            if (currentBookIndexes[genre] + 3 < totalBooks) {
                currentBookIndexes[genre] += 3;
                displayBooksForGenre(genre, booksByGenre[genre]);
            }
        });

    }).fail(function (error) {
        console.error("Error loading books:", error);
    });

});

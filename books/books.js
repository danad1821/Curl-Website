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
//     let currentBookIndex = 0; // Tracks the current index of the books to display (starting from 0)

//     // Load and display books categorized by genre
//     $.getJSON("../data.json", function (data) {
//         const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
//         const books = data.books.filter((book) =>
//             book.genres.some((genre) => genresToShow.includes(genre))
//         );

//         const $booksContainer = $("#books-list");
//         $booksContainer.empty();

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

//         // Function to display books based on selected genres
//         // function displayBooks() {
//         //     $booksContainer.empty(); // Clear any existing books
//         //     // const genre = selectedGenres[selectedGenres.length - 1]; // Get the latest selected genre

//         //     // if (!genre || !booksByGenre[genre]) return;



//         //     // Create a section for the genre
//         //     const genreDiv = $('<div class="genre-section"></div>');
//         //     const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);
//         //     const booksContainer = $('<div class="books-list"></div>');

//         //     // Limit to 3 books for the selected genre
//         //     // const booksToDisplay = booksByGenre[genre].slice(currentBookIndex, currentBookIndex + 3);

//         //     const booksToDisplay = booksByGenre[genre].slice(0, 3); // Always start from the beginning


//         //     // Loop through the 3 books to display
//         //     booksToDisplay.forEach(function (book) {
//         //         const bookHTML = `
//         //             <div class="book">
//         //                 <div class="book-image">
//         //                     <img src="${book.img}" alt="${book.title}" class="book-img">
//         //                 </div>
//         //                 <div class="book-info">
//         //                     <div class="book-details">
//         //                         <p>${book.title}</p>
//         //                         <p class="book-author">Author: <span>${book.author}</span></p>
//         //                     </div>
//         //                     <div class="price-div">
//         //                         <p class="book-price">$${book.price}</p>
//         //                         <div>
//         //                             <i class="far fa-heart"></i>
//         //                             <button class="add-to-cart-btn">Add</button>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </div>
//         //         `;
//         //         booksContainer.append(bookHTML);
//         //     });

//         //     genreDiv.append(genreTitle, booksContainer);
//         //     $booksContainer.append(genreDiv);

//         //     // Show the arrows if there are more books to display
//         //     const totalBooks = booksByGenre[genre].length;
//         //     if (totalBooks > 3) {
//         //         $('#scroll-left, #scroll-right').show();
//         //     } else {
//         //         $('#scroll-left, #scroll-right').hide();
//         //     }
//         // }

//         function displayBooks() {
//             $booksContainer.empty(); // Clear any existing books

//             selectedGenres.forEach((genre) => {
//                 if (!genre || !booksByGenre[genre]) return;

//                 // Create a section for the genre
//                 const genreDiv = $('<div class="genre-section"></div>');
//                 const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);
//                 const booksContainer = $('<div class="books-list"></div>');

//                 // Limit to 3 books for the selected genre
//                 const booksToDisplay = booksByGenre[genre].slice(0, 3); // Always start from the beginning

//                 // Loop through the 3 books to display
//                 booksToDisplay.forEach(function (book) {
//                     const bookHTML = `
//                         <div class="book">
//                             <div class="book-image">
//                                 <img src="${book.img}" alt="${book.title}" class="book-img">
//                             </div>
//                             <div class="book-info">
//                                 <div class="book-details">
//                                     <p>${book.title}</p>
//                                     <p class="book-author">Author: <span>${book.author}</span></p>
//                                 </div>
//                                 <div class="price-div">
//                                     <p class="book-price">$${book.price}</p>
//                                     <div>
//                                         <i class="far fa-heart"></i>
//                                         <button class="add-to-cart-btn">Add</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                     booksContainer.append(bookHTML);
//                 });

//                 genreDiv.append(genreTitle, booksContainer);
//                 $booksContainer.append(genreDiv);

//                 // Show arrows if there are more books for the genre
//                 const totalBooks = booksByGenre[genre].length;
//                 if (totalBooks > 3) {
//                     $('#scroll-left, #scroll-right').show();
//                 } else {
//                     $('#scroll-left, #scroll-right').hide();
//                 }
//             });
//         }


//         // Handle genre link clicks
//         $('#Genre a').click(function (e) {
//             e.preventDefault(); // Prevent page reload

//             const genre = $(this).text(); // Get the genre from the link text

//             // If the genre is already selected, remove it; otherwise, add it
//             if (selectedGenres.includes(genre)) {
//                 selectedGenres = selectedGenres.filter(g => g !== genre);
//                 $(this).css('color', ''); // Reset color if removed
//             } else if (selectedGenres.length < 3) {
//                 selectedGenres.push(genre);
//             }

//             // Display books based on selected genres
//             displayBooks();

//             // Disable further genre selection if 3 genres are selected
//             if (selectedGenres.length === 3) {
//                 $('#Genre a').not(':contains(' + selectedGenres.join('), :contains(') + ')').css('pointer-events', 'none');
//             } else {
//                 $('#Genre a').css('pointer-events', 'auto');
//             }
//         });

//         // Arrow functionality for scrolling books
//         $('#scroll-left').click(function () {
//             if (currentBookIndex > 0) {
//                 currentBookIndex -= 3;
//                 displayBooks();
//             }
//         });

//         $('#scroll-right').click(function () {
//             const genre = selectedGenres[selectedGenres.length - 1];
//             const totalBooks = booksByGenre[genre].length;
//             if (currentBookIndex + 3 < totalBooks) {
//                 currentBookIndex += 3;
//                 displayBooks();
//             }
//         });

//     }).fail(function (error) {
//         console.error("Error loading books:", error);
//     });
// });


// $(document).ready(function () {
//     let selectedGenres = [];
//     let currentBookIndex = 0; // Tracks the current index of the books to display (starting from 0)

//     // Load and display books categorized by genre
//     $.getJSON("../data.json", function (data) {
//         const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
//         const books = data.books.filter((book) =>
//             book.genres.some((genre) => genresToShow.includes(genre))
//         );

//         const $booksContainer = $("#carousel-books");
//         $booksContainer.empty();

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

//         // Function to display books based on selected genres
//         function displayBooks() {
//             $booksContainer.empty(); // Clear any existing books

//             selectedGenres.forEach((genre) => {
//                 if (!genre || !booksByGenre[genre]) return;

//                 // Create a section for the genre
//                 const genreDiv = $('<div class="genre-section"></div>');
//                 const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);
//                 const booksContainer = $('<div class="carousel-inner"></div>');

//                 // Limit to 3 books for the selected genre
//                 const booksToDisplay = booksByGenre[genre].slice(currentBookIndex, currentBookIndex + 3); // Always start from the current index

//                 // Loop through the 3 books to display
//                 booksToDisplay.forEach(function (book, index) {
//                     const activeClass = index === 0 ? 'active' : ''; // Mark the first book as active
//                     const bookHTML = `
//                         <div class="carousel-item ${activeClass}">
//                             <div class="book">
//                                 <div class="book-image">
//                                     <img src="${book.img}" alt="${book.title}" class="book-img">
//                                 </div>
//                                 <div class="book-info">
//                                     <div class="book-details">
//                                         <p>${book.title}</p>
//                                         <p class="book-author">Author: <span>${book.author}</span></p>
//                                     </div>
//                                     <div class="price-div">
//                                         <p class="book-price">$${book.price}</p>
//                                         <div>
//                                             <i class="far fa-heart"></i>
//                                             <button class="add-to-cart-btn">Add</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                     booksContainer.append(bookHTML);
//                 });

//                 genreDiv.append(genreTitle, booksContainer);
//                 $booksContainer.append(genreDiv);

//                 // Show arrows if there are more books for the genre
//                 const totalBooks = booksByGenre[genre].length;
//                 if (totalBooks > 3) {
//                     $('#scroll-left, #scroll-right').show();
//                 } else {
//                     $('#scroll-left, #scroll-right').hide();
//                 }
//             });
//         }

//         // Handle genre link clicks
//         $('#Genre a').click(function (e) {
//             e.preventDefault(); // Prevent page reload

//             const genre = $(this).text(); // Get the genre from the link text

//             // If the genre is already selected, remove it; otherwise, add it
//             if (selectedGenres.includes(genre)) {
//                 selectedGenres = selectedGenres.filter(g => g !== genre);
//                 $(this).css('color', ''); // Reset color if removed
//             } else if (selectedGenres.length < 3) {
//                 selectedGenres.push(genre);
//             }

//             // Display books based on selected genres
//             displayBooks();

//             // Disable further genre selection if 3 genres are selected
//             if (selectedGenres.length === 3) {
//                 $('#Genre a').not(':contains(' + selectedGenres.join('), :contains(') + ')').css('pointer-events', 'none');
//             } else {
//                 $('#Genre a').css('pointer-events', 'auto');
//             }
//         });

//         // Arrow functionality for scrolling books using Bootstrap carousel
//         $('#scroll-left').click(function () {
//             $('#books-list').carousel('prev');
//         });

//         $('#scroll-right').click(function () {
//             $('#books-list').carousel('next');
//         });

//     }).fail(function (error) {
//         console.error("Error loading books:", error);
//     });
// });


// $(document).ready(function () {
//     let selectedGenres = [];
//     let currentBookIndex = 0; // Tracks the current index of the books to display (starting from 0)

//     // Load and display books categorized by genre
//     $.getJSON("../data.json", function (data) {
//         const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
//         const books = data.books.filter((book) =>
//             book.genres.some((genre) => genresToShow.includes(genre))
//         );

//         const $booksContainer = $("#carousel-books");
//         $booksContainer.empty();

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

//         // Function to display books based on selected genres
//         function displayBooks() {
//             $booksContainer.empty(); // Clear any existing books

//             selectedGenres.forEach((genre) => {
//                 if (!genre || !booksByGenre[genre]) return;

//                 // Create a section for the genre
//                 const genreDiv = $('<div class="genre-section"></div>');
//                 const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

//                 // Books container for carousel
//                 const booksContainer = $('<div class="carousel-inner"></div>');

//                 // Get the books in sets of 3
//                 const booksToDisplay = booksByGenre[genre].slice(currentBookIndex, currentBookIndex + 3); // Show 3 books at a time

//                 // Loop through the 3 books to display
//                 booksToDisplay.forEach(function (book, index) {
//                     const activeClass = index === 0 ? 'active' : ''; // Mark the first book as active
//                     const bookHTML = `
//                         <div class="carousel-item ${activeClass}">
//                             <div class="book">
//                                 <div class="book-image">
//                                     <img src="${book.img}" alt="${book.title}" class="book-img">
//                                 </div>
//                                 <div class="book-info">
//                                     <div class="book-details">
//                                         <p>${book.title}</p>
//                                         <p class="book-author">Author: <span>${book.author}</span></p>
//                                     </div>
//                                     <div class="price-div">
//                                         <p class="book-price">$${book.price}</p>
//                                         <div>
//                                             <i class="far fa-heart"></i>
//                                             <button class="add-to-cart-btn">Add</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                     booksContainer.append(bookHTML);
//                 });

//                 genreDiv.append(genreTitle, booksContainer);
//                 $booksContainer.append(genreDiv);

//                 // Show arrows if there are more books for the genre
//                 const totalBooks = booksByGenre[genre].length;
//                 if (totalBooks > 3) {
//                     $('#scroll-left, #scroll-right').show();
//                 } else {
//                     $('#scroll-left, #scroll-right').hide();
//                 }
//             });
//         }

//         // Handle genre link clicks
//         $('#Genre a').click(function (e) {
//             e.preventDefault(); // Prevent page reload

//             const genre = $(this).text(); // Get the genre from the link text

//             // If the genre is already selected, remove it; otherwise, add it
//             if (selectedGenres.includes(genre)) {
//                 selectedGenres = selectedGenres.filter(g => g !== genre);
//                 $(this).css('color', ''); // Reset color if removed
//             } else if (selectedGenres.length < 3) {
//                 selectedGenres.push(genre);
//             }

//             // Display books based on selected genres
//             displayBooks();

//             // Disable further genre selection if 3 genres are selected
//             if (selectedGenres.length === 3) {
//                 $('#Genre a').not(':contains(' + selectedGenres.join('), :contains(') + ')').css('pointer-events', 'none');
//             } else {
//                 $('#Genre a').css('pointer-events', 'auto');
//             }
//         });

//         // Arrow functionality for scrolling books
//         $('#scroll-left').click(function () {
//             if (currentBookIndex > 0) {
//                 currentBookIndex -= 3;
//                 displayBooks();
//             }
//         });

//         $('#scroll-right').click(function () {
//             const genre = selectedGenres[selectedGenres.length - 1];
//             const totalBooks = booksByGenre[genre].length;
//             if (currentBookIndex + 3 < totalBooks) {
//                 currentBookIndex += 3;
//                 displayBooks();
//             }
//         });

//     }).fail(function (error) {
//         console.error("Error loading books:", error);
//     });
// });



$(document).ready(function () {
    let selectedGenres = [];
    let currentBookIndex = 0; // Tracks the current index of the books to display (starting from 0)

    // Load and display books categorized by genre
    $.getJSON("../data.json", function (data) {
        const genresToShow = ["Fantasy", "Mystery", "Romance", "Young Adult", "Comedy", "Thriller", "Family", "Philosophy", "Psychology", "Science-Fiction"];
        const books = data.books.filter((book) =>
            book.genres.some((genre) => genresToShow.includes(genre))
        );

        const $booksContainer = $("#carousel-books");
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

        // Function to display books based on selected genres
        function displayBooks() {
            $booksContainer.empty(); // Clear any existing books

            selectedGenres.forEach((genre) => {
                if (!genre || !booksByGenre[genre]) return;

                // Create a section for the genre
                const genreDiv = $('<div class="genre-section"></div>');
                const genreTitle = $('<h3 class="genre-title"></h3>').text(genre);

                // Books container for carousel
                const booksContainer = $('<div class="carousel-inner"></div>');

                // Group books into sets of 3 and display
                const booksToDisplay = booksByGenre[genre].slice(currentBookIndex, currentBookIndex + 3); // Show 3 books at a time
                const chunkedBooks = chunkArray(booksToDisplay, 3); // Create chunks of 3 books

                chunkedBooks.forEach((chunk, chunkIndex) => {
                    const activeClass = chunkIndex === 0 ? 'active' : ''; // Mark the first chunk as active
                    const carouselItem = $('<div class="carousel-item ' + activeClass + '"></div>');
                    chunk.forEach(function (book) {
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
                        carouselItem.append(bookHTML);
                    });
                    booksContainer.append(carouselItem); // Append each chunk of books as a carousel-item
                });

                genreDiv.append(genreTitle, booksContainer);
                $booksContainer.append(genreDiv);

                // Show arrows if there are more books for the genre
                const totalBooks = booksByGenre[genre].length;
                if (totalBooks > 3) {
                    $('#scroll-left, #scroll-right').show();
                } else {
                    $('#scroll-left, #scroll-right').hide();
                }
            });
        }

        // Helper function to chunk an array into smaller arrays of length 3
        function chunkArray(array, size) {
            const result = [];
            for (let i = 0; i < array.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        }

        // Handle genre link clicks
        $('#Genre a').click(function (e) {
            e.preventDefault(); // Prevent page reload

            const genre = $(this).text(); // Get the genre from the link text

            // If the genre is already selected, remove it; otherwise, add it
            if (selectedGenres.includes(genre)) {
                selectedGenres = selectedGenres.filter(g => g !== genre);
                $(this).css('color', ''); // Reset color if removed
            } else if (selectedGenres.length < 3) {
                selectedGenres.push(genre);
            }

            // Display books based on selected genres
            displayBooks();

            // Disable further genre selection if 3 genres are selected
            if (selectedGenres.length === 3) {
                $('#Genre a').not(':contains(' + selectedGenres.join('), :contains(') + ')').css('pointer-events', 'none');
            } else {
                $('#Genre a').css('pointer-events', 'auto');
            }
        });

        // Arrow functionality for scrolling books
        $('#scroll-left').click(function () {
            if (currentBookIndex > 0) {
                currentBookIndex -= 3;
                displayBooks();
            }
        });

        $('#scroll-right').click(function () {
            const genre = selectedGenres[selectedGenres.length - 1];
            const totalBooks = booksByGenre[genre].length;
            if (currentBookIndex + 3 < totalBooks) {
                currentBookIndex += 3;
                displayBooks();
            }
        });

    }).fail(function (error) {
        console.error("Error loading books:", error);
    });
});


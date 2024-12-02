// $(document).ready(function () {
//     // Retrieve the book data from localStorage
//     const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

//     if (selectedBook) {
//         // Populate the book details
//         $('#book-title').text(selectedBook.title);
//         $('#book-author').html(`<span>By: </span>${selectedBook.author}`);
//         $('#book-availability').html(`<span>Availability: </span>${selectedBook.availability} in stock`);
//         $('#book-genre').html(`<span>Genre: </span>${selectedBook.genres.join(', ')}`);
//         $('#book-price').text(`$${selectedBook.price}`);
//         $('#book-description').text(selectedBook.summary);

//         // Update the breadcrumbs
//         $('#breadcrumbs').text(`Books > ${selectedBook.genres[0]} > ${selectedBook.title}`);

//         // Update the book image
//         $('#book-image').attr('src', selectedBook.img);
//     } else {
//         console.error('No book data found');
//     }
// });


// $(document).ready(function () {
//     // Retrieve the book data from localStorage
//     const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

//     if (selectedBook) {
//         // Populate the book details
//         $('#book-title').text(selectedBook.title);
//         $('#book-author').html(`<span>By: </span>${selectedBook.author}`);
//         $('#book-availability').html(`<span>Availability: </span>${selectedBook.availability} in stock`);
//         $('#book-genre').html(`<span>Genre: </span>${selectedBook.genres.join(', ')}`);
//         $('#book-price').text(`$${selectedBook.price}`);
//         $('#book-description').text(selectedBook.summary);

//         // Update the breadcrumbs
//         const genre = selectedBook.genres[0]; // Assuming there's one genre per book
//         $('#genre-link').text(genre).attr('href', `books.html?genre=${genre}`);

//         // Update the book image
//         $('#book-image').attr('src', selectedBook.img);
//     } else {
//         console.error('No book data found');
//     }
// });


$(document).ready(function () {
    // Retrieve the book data from localStorage
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

    if (selectedBook) {
        // Populate the book details
        $('#book-title').text(selectedBook.title);
        $('#book-author').html(`<span>By: </span>${selectedBook.author}`);
        $('#book-availability').html(`<span>Availability: </span>${selectedBook.availability} in stock`);
        $('#book-genre').html(`<span>Genre: </span>${selectedBook.genres.join(', ')}`);
        $('#book-price').text(`$${selectedBook.price}`);
        $('#book-description').text(selectedBook.summary);

        // Update the breadcrumbs
        const genre = selectedBook.genres[0]; // Assuming there's one genre per book
        $('#genre-link').text(genre).attr('href', `books.html?genre=${genre}`);
        $('#book-title-breadCrumbs').text(selectedBook.title);

        // Update the book image
        $('#book-image').attr('src', selectedBook.img);

        // Load similar books
        $.getJSON("../data.json", function (data) {
            const allBooks = data.books;

            // Filter books with similar genres excluding the current book
            const similarBooks = allBooks
                .filter(book =>
                    book.id !== selectedBook.id &&
                    book.genres.some(genre => selectedBook.genres.includes(genre))
                )
                .slice(0, 6); // Limit to 6 books

            if (similarBooks.length > 0) {
                createSimilarBooksCarousel(similarBooks);
            }
        }).fail(function (error) {
            console.error("Error loading books data:", error);
        });
    } else {
        console.error('No book data found');
    }

    // Function to create the similar books carousel
    function createSimilarBooksCarousel(similarBooks) {
        const $similarBooksContainer = $('#similar-books-container');
        const scrollLeft = $(`<div class="scroll-arrow left-arrow" style="display: none;">
            <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
        </div>`);
        const scrollRight = $(`<div class="scroll-arrow right-arrow" style="display: none;">
            <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
        </div>`);
        const booksList = $(`<div class="books-list carousel" data-bs-ride="carousel"></div>`);

        $similarBooksContainer.empty(); // Clear any existing content
        $similarBooksContainer.append(scrollLeft, booksList, scrollRight);

        let currentIndex = 0;

        function displayBooks() {
            booksList.empty(); // Clear existing books

            const booksToDisplay = similarBooks.slice(currentIndex, currentIndex + 4); // Show 4 books at a time

            booksToDisplay.forEach(book => {
                const bookHTML = `
                    <div class="book" data-book-id="${book.id}">
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
                booksList.append(bookHTML);
            });

            // Show or hide arrows
            if (currentIndex > 0) {
                scrollLeft.show();
            } else {
                scrollLeft.hide();
            }

            if (currentIndex + 4 < similarBooks.length) {
                scrollRight.show();
            } else {
                scrollRight.hide();
            }
        }

        // Initial display
        displayBooks();

        // Arrow click events
        scrollLeft.click(function () {
            if (currentIndex > 0) {
                currentIndex -= 4;
                displayBooks();
            }
        });

        scrollRight.click(function () {
            if (currentIndex + 4 < similarBooks.length) {
                currentIndex += 4;
                displayBooks();
            }
        });

        // Add click event to redirect to a new book
        booksList.on('click', '.book', function () {
            const bookId = $(this).data('book-id');
            const bookData = similarBooks.find(book => book.id === bookId);

            // Store the book data in localStorage
            localStorage.setItem('selectedBook', JSON.stringify(bookData));

            // Redirect to the book details page
            window.location.href = 'book.html';
        });
    }


    let quantity = 1;  // Initial quantity

    // Update quantity when the increase button is clicked
    $('.increase').click(function () {
        quantity++;
        $('#quantity').text(quantity);  // Update the displayed quantity
    });

    // Update quantity when the decrease button is clicked
    $('.decrease').click(function () {
        if (quantity > 1) {
            quantity--;  // Prevent quantity from going below 1
            $('#quantity').text(quantity);  // Update the displayed quantity
        }
    });
});



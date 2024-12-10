$(document).ready(function () {
    // Retrieve the book data from localStorage
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

    // filling in the html structure dynamically
    if (selectedBook) {
        $('#book-title').text(selectedBook.title);
        $('#book-author').html(`<span>By: </span>${selectedBook.author}`);
        $('#book-availability').html(`<span>Availability: </span>${selectedBook.availability} in stock`);
        $('#book-genre').html(`<span>Genre: </span>${selectedBook.genres.join(', ')}`);
        $('#book-price').text(`$${selectedBook.price}`);
        $('#book-description').text(selectedBook.summary);

        // Updating the breadcrumbs
        const genre = selectedBook.genres[0]; // Assuming there's one genre per book
        $('#genre-link').text(genre).attr('href', `books.html?genre=${genre}`);
        $('#book-title-breadCrumbs').text(selectedBook.title);

        // book image
        $('#book-image').attr('src', selectedBook.img);

        // Load similar books
        $.getJSON("../data.json", function (data) {
            const allBooks = data.books;

            // Filtering books with similar genres excluding the current book
            const similarBooks = allBooks
                .filter(book =>
                    book.id !== selectedBook.id &&
                    book.genres.some(genre => selectedBook.genres.includes(genre))
                )
                .slice(0, 6);

            if (similarBooks.length > 0) {
                createBooksCarousel(similarBooks);
            }
        }).fail(function (error) {
            console.error("Error loading books data:", error);
        });
    } else {
        console.error('No book data found');
    }


    // similar books carousel
    function createBooksCarousel(similarBooks) {
        const $similarBooksContainer = $('#similar-books-container');
        const scrollLeft = $(`<div class="scroll-arrow left-arrow" style="display: none;">
            <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
        </div>`);
        const scrollRight = $(`<div class="scroll-arrow right-arrow" style="display: none;">
            <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
        </div>`);
        const booksList = $(`<div class="books-list carousel"></div>`);

        $similarBooksContainer.empty();
        $similarBooksContainer.append(scrollLeft, booksList, scrollRight);

        let currentIndex = 0;

        function getBooksPerView() {
            const width = window.innerWidth;

            if (width <= 400) return 1; // Show 1 book at 400px or less
            if (width <= 768) return 2; // Show 2 books at 768px or less
            return 4; // Default to 4 books
        }

        function displayBooks(direction) {
            booksList.addClass('transition'); // transition clas for sliding
            booksList.css('transform', `translateX(${direction === 'left' ? '100%' : '-100%'})`);

            setTimeout(() => {
                booksList.removeClass('transition');
                booksList.css('transform', 'translateX(0)');

                booksList.empty();

                const booksPerView = getBooksPerView();
                const booksToDisplay = similarBooks.slice(currentIndex, currentIndex + booksPerView);

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
                scrollLeft.toggle(currentIndex > 0);
                scrollRight.toggle(currentIndex + booksPerView < similarBooks.length);
            }, 300);
        }

        // Initial display
        displayBooks();

        // Arrow click events
        scrollLeft.click(function () {
            const booksPerView = getBooksPerView();
            if (currentIndex > 0) {
                currentIndex -= booksPerView;
                displayBooks('left');
            }
        });

        scrollRight.click(function () {
            const booksPerView = getBooksPerView();
            if (currentIndex + booksPerView < similarBooks.length) {
                currentIndex += booksPerView;
                displayBooks('right');
            }
        });

        // click event to redirect to a new book
        booksList.on('click', '.book', function () {
            const bookId = $(this).data('book-id');
            const bookData = similarBooks.find(book => book.id === bookId);

            localStorage.setItem('selectedBook', JSON.stringify(bookData));
            window.location.href = 'book.html';
        });

        $(window).resize(displayBooks);
    }

    const wishlist = JSON.parse(localStorage.getItem("wishData")) || {};

    // Add to wishlist functionality
    $('#wishlist-btn').click(function () {
        const $heartIcon = $(this);
        const bookId = selectedBook.id;

        // Toggle the wishlist state
        const isInWishlist = wishlist[bookId];
        if (isInWishlist) {
            // Remove from wishlist
            delete wishlist[bookId];
            $heartIcon.removeClass("fas").addClass("far");
            $heartIcon.css("color", "");
        } else {
            // Add to wishlist
            wishlist[bookId] = selectedBook;
            $heartIcon.removeClass("far").addClass("fas");
            $heartIcon.css("color", "#e9b9b9");
        }

        // Save the updated wishlist to localStorage
        localStorage.setItem("wishData", JSON.stringify(wishlist));
    });


    const cart = JSON.parse(localStorage.getItem("cartData")) || {};

    // Initialize quantity
    let quantity = 1;

    // Update quantity on increase
    $('.increase').click(function () {
        quantity++;
        $('#quantity').text(quantity);
    });

    // Update quantity on decrease
    $('.decrease').click(function () {
        if (quantity > 1) {
            quantity--; // Prevent quantity from going below 1
            $('#quantity').text(quantity);
        }
    });

    // Add to cart functionality
    $('.add-to-cart-btn').click(function () {
        const bookId = selectedBook.id;

        // Check if the book is already in the cart
        const existingItem = cart[bookId];

        if (existingItem) {
            // Update the quantity in the cart
            existingItem.quantity += quantity;
        } else {
            // Add the book to the cart with the specified quantity
            selectedBook.quantity = quantity;
            cart[bookId] = selectedBook;
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cartData", JSON.stringify(cart));
        alert(`${selectedBook.title} has been added to the cart.`);
    });

});


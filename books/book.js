
$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || { books: [] };
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Retrieve the book data from localStorage
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

    if (selectedBook) {
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

    // Function to create the similar books carousel
    function createBooksCarousel(similarBooks) {
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

            const booksToDisplay = similarBooks.slice(currentIndex, currentIndex + 4);

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

            localStorage.setItem('selectedBook', JSON.stringify(bookData));

            window.location.href = 'book.html';
        });
    }

    // JAVASCRIPT TRANSITION WORKS HERE
    // function createBooksCarousel(similarBooks) {
    //     const $similarBooksContainer = $('#similar-books-container');
    //     const scrollLeft = $(`<div class="scroll-arrow left-arrow" style="display: none;">
    //         <img src="../designImages/books/LeftArrow.png" alt="Left Arrow" />
    //     </div>`);
    //     const scrollRight = $(`<div class="scroll-arrow right-arrow" style="display: none;">
    //         <img src="../designImages/books/RightArrow.png" alt="Right Arrow" />
    //     </div>`);
    //     const booksList = $(`<div class="books-list carousel"></div>`);

    //     $similarBooksContainer.empty(); // Clear any existing content
    //     $similarBooksContainer.append(scrollLeft, booksList, scrollRight);

    //     let currentIndex = 0;
    //     const booksPerPage = 4;

    //     // Function to display books with transitions
    //     function displayBooks(direction) {
    //         booksList.addClass('transition'); // Add transition class
    //         booksList.css('transform', `translateX(${direction === 'left' ? '100%' : '-100%'})`);

    //         // Wait for the transition to finish before updating the content
    //         setTimeout(() => {
    //             booksList.removeClass('transition'); // Remove transition class
    //             booksList.css('transform', 'translateX(0)'); // Reset position

    //             // Clear and render new books
    //             booksList.empty();
    //             const booksToDisplay = similarBooks.slice(currentIndex, currentIndex + booksPerPage);
    //             booksToDisplay.forEach(book => {
    //                 const bookHTML = `
    //                     <div class="book" data-book-id="${book.id}">
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
    //                 booksList.append(bookHTML);
    //             });

    //             // Show or hide arrows
    //             scrollLeft.toggle(currentIndex > 0);
    //             scrollRight.toggle(currentIndex + booksPerPage < similarBooks.length);
    //         }, 300); // Match the CSS transition duration
    //     }

    //     // Initial display
    //     displayBooks();

    //     // Arrow click events
    //     scrollLeft.click(() => {
    //         if (currentIndex > 0) {
    //             currentIndex -= booksPerPage;
    //             displayBooks('left');
    //         }
    //     });

    //     scrollRight.click(() => {
    //         if (currentIndex + booksPerPage < similarBooks.length) {
    //             currentIndex += booksPerPage;
    //             displayBooks('right');
    //         }
    //     });

    //     // Add click event to redirect to a new book
    //     booksList.on('click', '.book', function () {
    //         const bookId = $(this).data('book-id');
    //         const bookData = similarBooks.find(book => book.id === bookId);

    //         localStorage.setItem('selectedBook', JSON.stringify(bookData));
    //         window.location.href = 'book.html';
    //     });
    // }





    let quantity = 1;  // Initial quantity

    // Update quantity on increase
    $('.increase').click(function () {
        quantity++;
        $('#quantity').text(quantity);
    });

    // Update quantity on decrease
    $('.decrease').click(function () {
        if (quantity > 1) {
            quantity--;  // Prevent quantity from going below 1
            $('#quantity').text(quantity);
        }
    });


    // Add to cart functionality
    $('.add-to-cart-btn').click(function () {
        // Check if the book is already in the cart
        const existingItem = cart.books.find(book => book.id === selectedBook.id);

        if (existingItem) {
            // Update the quantity in the cart
            existingItem.quantity += quantity;
        } else {
            // Add the book to the cart with the specified quantity
            selectedBook.quantity = quantity;
            cart.books.push(selectedBook);
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    });

    // Add to wishlist functionality
    $('#wishlist-btn').click(function () {
        const $heartIcon = $(this);
        // Toggle the wishlist state
        const isInWishlist = wishlist.books.some(b => b.id === selectedBook.id);
        if (isInWishlist) {
            // Remove from wishlist
            wishlist.books = wishlist.books.filter(b => b.id !== bookData.id);
            $heartIcon.removeClass("fas").addClass("far"); // Change to outlined heart
            $heartIcon.css("color", ""); // Reset the color when removed from wishlist

        } else {
            // Add to wishlist
            wishlist.books.push(selectedBook);
            $heartIcon.removeClass("far").addClass("fas"); // Change to filled heart
            $heartIcon.css("color", "#e9b9b9"); // Set the color when added to wishlist

        }

        // Save updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });




});


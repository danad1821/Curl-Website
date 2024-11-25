$(document).ready(function () {
    $("#header").load("../Header/header.html");
    $("#footer").load("../footer/footer.html");
});

$(document).ready(function () {
    const wishContainer = $("#wish-items");
    const itemCountDisplay = $("#wish-item-count"); // The element where the item count will be displayed

    // Retrieve the wish from localStorage
    const wishData = JSON.parse(localStorage.getItem("wishData")) || {};

    // Fetch data.json to get item details
    $.getJSON("../data.json", function (data) {
        const allItems = data.menu_menu;

        // Function to update the wish in localStorage
        function updateWishStorage() {
            localStorage.setItem("wishData", JSON.stringify(wishData));
        }

        // Function to calculate the total quantity of items in the wish
        function calculateTotalItems() {
            return Object.values(wishData).reduce((total, item) => total + item.quantity, 0);
        }

        // Function to calculate the total price of items in the wish
        function calculateTotalPrice() {
            return Object.entries(wishData).reduce((total, [id, item]) => {
                const product = allItems.find(p => p.id == id);
                if (product) {
                    return total + (product.price * item.quantity);
                }
                return total;
            }, 0);
        }

        // Function to render the wish
        function displayWish() {
            wishContainer.empty(); // Clear existing content
            const wishItemsArray = Object.entries(wishData); // Convert wish data to array for easier iteration

            // Loop through wish items and append them
            wishItemsArray.forEach(([id, item]) => {
                const product = allItems.find(p => p.id == id);
                if (product) {
                    // Calculate total price for the item
                    const totalPrice = (product.price * item.quantity);

                    const wishItem = `
                        <div class="wish-item">
                            <img src="${product.img}" alt="${product.name}" class="wish-img">
                            <h3 class="wish-name">${product.name}</h3>
                            <div class="btn-span">
                                <div class="quantity-control">
                                    <button class="quantity-btn decrease" data-id="${id}" ${
                                        item.quantity === 1 ? "disabled" : ""
                                    }>-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn increase" data-id="${id}">+</button>
                                </div>
                                <span class="wish-price">$${totalPrice}</span>
                            </div>
                            <button class="remove-btn" data-id="${id}" aria-label="Remove item">
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon'>
                                    <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/>
                                </svg>
                            </button>
                        </div>
                    `;
                    wishContainer.append(wishItem);
                }
            });

            // Update the total items count in the wish
            const totalItems = calculateTotalItems();
            itemCountDisplay.text(totalItems); // Display the total quantity in the element

            // Calculate and display the total price
            const totalPrice = calculateTotalPrice();
            $("#total-price").text(`Total: $${totalPrice}`);
        }

        // Event listener for increase and decrease buttons
        wishContainer.on("click", ".quantity-btn", function () {
            const id = $(this).data("id");
            if ($(this).hasClass("increase")) {
                wishData[id].quantity += 1;
            } else if ($(this).hasClass("decrease")) {
                if (wishData[id].quantity > 1) {
                    wishData[id].quantity -= 1;
                }
            }
            updateWishStorage();
            displayWish();
        });

        // Event listener for remove buttons
        wishContainer.on("click", ".remove-btn", function () {
            const id = $(this).data("id");
            delete wishData[id];
            updateWishStorage();
            displayWish();
        });

        // Initial rendering of the wish
        displayWish();
    });
});
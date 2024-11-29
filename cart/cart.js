$(document).ready(function () {
    $("#header").load("../Header/header.html");
    $("#footer").load("../footer/footer.html");
});

$(document).ready(function () {
    const cartContainer = $("#cart-items");
    const itemCountDisplay = $("#cart-item-count"); // The element where the item count will be displayed

    // Retrieve the cart from localStorage
    const cartData = JSON.parse(localStorage.getItem("cartData")) || {};

    // Fetch data.json to get item details
    $.getJSON("../data.json", function (data) {
        const allItems = data.menu_menu;

        // Function to update the cart in localStorage
        function updateCartStorage() {
            localStorage.setItem("cartData", JSON.stringify(cartData));
        }

        // Function to calculate the total quantity of items in the cart
        function calculateTotalItems() {
            return Object.values(cartData).reduce((total, item) => total + item.quantity, 0);
        }

        // Function to calculate the total price of items in the cart
        function calculateTotalPrice() {
            return Object.entries(cartData).reduce((total, [id, item]) => {
                const product = allItems.find(p => p.id == id);
                if (product) {
                    return total + (product.price * item.quantity);
                }
                return total;
            }, 0);
        }

        // Function to render the cart
        function displayCart() {
            cartContainer.empty(); // Clear existing content
            const cartItemsArray = Object.entries(cartData); // Convert cart data to array for easier iteration

            // Loop through cart items and append them
            cartItemsArray.forEach(([id, item]) => {
                const product = allItems.find(p => p.id == id);
                if (product) {
                    // Calculate total price for the item
                    const totalPrice = (product.price * item.quantity);

                    const cartItem = `
                        <div class="cart-item">
                            <img src="${product.img}" alt="${product.name}" class="cart-img">
                            <h3 class="cart-name">${product.name}</h3>
                            <div class="quantity-control">
                                <button class="quantity-btn decrease" data-id="${id}" ${
                                    item.quantity === 1 ? "disabled" : ""
                                }>-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${id}">+</button>
                            </div>
                            <span class="cart-price">$${totalPrice}</span>
                            <button class="remove-btns" data-id="${id}" aria-label="Remove item">
                                <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <hr class="custom-hr">
                        </div>
                    `;
                    cartContainer.append(cartItem);
                }
            });

            // Update the total items count in the cart
            const totalItems = calculateTotalItems();
            itemCountDisplay.text(totalItems); // Display the total quantity in the element

            // Calculate and display the total price
            const totalPrice = calculateTotalPrice();
            $("#total-price").html(`Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${totalPrice}`);
            
        }

        // Event listener for increase and decrease buttons
        cartContainer.on("click", ".quantity-btn", function () {
            const id = $(this).data("id");
            if ($(this).hasClass("increase")) {
                cartData[id].quantity += 1;
            } else if ($(this).hasClass("decrease")) {
                if (cartData[id].quantity > 1) {
                    cartData[id].quantity -= 1;
                }
            }
            updateCartStorage();
            displayCart();
        });

        // Event listener for remove buttons
        cartContainer.on("click", ".remove-btns", function () {
            const id = $(this).data("id");
            delete cartData[id];
            updateCartStorage();
            displayCart();
        });

        // Initial rendering of the cart
        displayCart();
    });
});

$(document).ready(function() {
    $('#ecom-icon').click(function() {
        $(this).toggleClass('toggled');
    });
});

$(document).ready(function() {
    $('#ecom-master').click(function() {
        $(this).toggleClass('toggled');
    });
});

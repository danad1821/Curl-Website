$(document).ready(function () {
    $("#header").load("../Header/header.html");
    
    $("#footer").load("../footer/footer.html");
});

$(document).ready(function () {
    let currentIndex = 0; // Index to keep track of the current displayed items
    const itemsPerPage = 3; // Number of items to display at once

    // Fetch the data from data.json
    $.getJSON("../data.json", function (data) {
        // Filter the items with "Pastry" in their categories
        const pastries = data.menu.filter(item =>
            item.categories.includes("Pastry")
        );

        // Function to display items based on the current index
        function displayPastries() {
            const container = $("#pastries-items");
            const visibleItems = pastries.slice(currentIndex, currentIndex + itemsPerPage);

            // Clear existing content
            container.empty();

            // Append the visible items
            visibleItems.forEach(pastry => {
                const pastryCard = `
                <div class="pastry-card">
                    <img src="${pastry.img}" alt="${pastry.name}" class="pastry-img">
                    <h3 class="pastry-name">${pastry.name}</h3>
                    <p class="pastry-description">${pastry.description}</p>
                    <div class="price-container">
                        <p class="pastry-price">$${pastry.price}</p>
                        <div class="right">
                            <button class='menuPageBtn pinkAddBtn' onclick = "AddtoCart(${pastry.id})"> Add </button>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon' onclick = "AddtoWish(${pastry.id})">
                                <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/>
                            </svg>
                        </div>
                    </div>
                </div>
                `;
                container.append(pastryCard);
            });
        }

        // Initially display the first set of pastries
        displayPastries();

        // Add click event listener for the "Next" arrow button
        $("#pastries-items-next").click(function () {
            // Update the index to show the next set of items
            currentIndex += itemsPerPage;

            // Reset to the start if we go beyond the last item
            if (currentIndex >= pastries.length) {
                currentIndex = 0;
            }

        // Add a sliding animation
        $("#pastries-items").addClass("slide-out");
        // Wait for the duration of the animation (200ms), then update the content
        setTimeout(() => {
            displayPastries();

            // Remove the slide-out class and add the slide-in class
            $("#pastries-items").removeClass("slide-out").addClass("slide-in");

            // Ensure the slide-in class is also removed after the animation completes
            setTimeout(() => {
                $("#pastries-items").removeClass("slide-in");
            }, 150); // Match the animation duration
        }, 150); // Match the animation duration

                });
            });
        });

        function AddtoCart(id) {
            const existingCart = JSON.parse(localStorage.getItem("cartData")) || {};
            if (existingCart[id]) {
                existingCart[id].quantity += 1;
            } else {
                existingCart[id] = { id: id, quantity: 1 };
            }
            localStorage.setItem("cartData", JSON.stringify(existingCart));
        }

        function AddtoWish(id) {
            const existingWish = JSON.parse(localStorage.getItem("wishData")) || {};
            if (existingWish[id]) {
                existingWish[id].quantity += 1;
            } else {
                existingWish[id] = { id: id, quantity: 1 };
            }
            localStorage.setItem("wishData", JSON.stringify(existingWish));
        
            // Trigger the update for the wishlist UI immediately
            displayWish(); // Ensure this is calling the displayWish function from wish.js
        }
        

$(document).ready(function () {
    let currentIndex = 0; // Index to keep track of the current displayed items
    const itemsPerPage = 3; // Number of items to display at once

    // Fetch the data from data.json
    $.getJSON("../data.json", function (data) {
        // Filter the items with "Drink" in their categories
        const drinks = data.menu.filter(item =>
            item.categories.includes("Drink")
        );

        // Function to display items based on the current index
        function displayDrinks() {
            const container = $("#Drinks-items");
            const visibleItems = drinks.slice(currentIndex, currentIndex + itemsPerPage);

            // Clear existing content
            container.empty();

            // Append the visible items
            visibleItems.forEach(drink => {
                const drinkCard = `
                <div class="drink-card">
                    <img src="${drink.img}" alt="${drink.name}" class="drink-img">
                    <h3 class="drink-name">${drink.name}</h3>
                    <p class="drink-description">${drink.description}</p>
                    <div class="price-container">
                        <p class="drink-price">$${drink.price}</p>
                        <div class="right">
                            <button class='menuPageBtn pinkAddBtn' onclick = "AddtoCart(${drink.id})"> Add </button>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon' onclick = "AddtoWish(${drink.id})">
                                <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/>
                            </svg>
                        </div>
                    </div>
                </div>
                `;
                container.append(drinkCard);
            });
        }

        // Initially display the first set of drinks
        displayDrinks();

        // Add click event listener for the "Next" arrow button
        $("#drinks-items-next").click(function () {
            // Update the index to show the next set of items
            currentIndex += itemsPerPage;

            // Reset to the start if we go beyond the last item
            if (currentIndex >= drinks.length) {
                currentIndex = 0;
            }

            // Add a sliding animation
        $("#Drinks-items").addClass("slide-out");
        // Wait for the duration of the animation (200ms), then update the content
        setTimeout(() => {
            displayDrinks();
        
            // Remove the slide-out class and add the slide-in class
            $("#Drinks-items").removeClass("slide-out").addClass("slide-in");
        
            // Ensure the slide-in class is also removed after the animation completes
            setTimeout(() => {
                $("#Drinks-items").removeClass("slide-in");
            }, 150); // Match the animation duration
        }, 150); // Match the animation duration
        
                });
            });
        });

$(document).ready(function () {
    let currentIndex = 0; // Index to keep track of the current displayed items
    const itemsPerPage = 3; // Number of items to display at once

    // Fetch the data from data.json
    $.getJSON("../data.json", function (data) {
        // Filter the items with "Sweet" in their categories
        const sweets = data.menu.filter(item =>
            item.categories.includes("sweet")
        );

        // Function to display items based on the current index
        function displaySweets() {
            const container = $("#sweets-items");
            const visibleItems = sweets.slice(currentIndex, currentIndex + itemsPerPage);

            // Clear existing content
            container.empty();

            // Append the visible items
            visibleItems.forEach(sweet => {
                const sweetCard = `
                <div class="sweet-card">
                    <img src="${sweet.img}" alt="${sweet.name}" class="sweet-img">
                    <h3 class="sweet-name">${sweet.name}</h3>
                    <p class="sweet-description">${sweet.description}</p>
                    <div class="price-container">
                        <p class="sweet-price">$${sweet.price}</p>
                        <div class="right">
                            <button class='menuPageBtn pinkAddBtn' onclick = "AddtoCart(${sweet.id})"> Add </button>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon' onclick = "AddtoWish(${sweet.id})">
                                <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/>
                            </svg>
                        </div>
                    </div>
                </div>
                `;
                container.append(sweetCard);
            });
        }

        // Initially display the first set of sweets
        displaySweets();

        // Add click event listener for the "Next" arrow button
        $("#sweets-items-next").click(function () {
            // Update the index to show the next set of items
            currentIndex += itemsPerPage;

            // Reset to the start if we go beyond the last item
            if (currentIndex >= sweets.length) {
                currentIndex = 0;
            }

            // Add a sliding animation
            $("#sweets-items").addClass("slide-out");
            // Wait for the duration of the animation (200ms), then update the content
            setTimeout(() => {
                displaySweets();
            
                // Remove the slide-out class and add the slide-in class
                $("#sweets-items").removeClass("slide-out").addClass("slide-in");
            
                // Ensure the slide-in class is also removed after the animation completes
                setTimeout(() => {
                    $("#sweets-items").removeClass("slide-in");
                }, 150); // Match the animation duration
            }, 150); // Match the animation duration            
        });
    });
});
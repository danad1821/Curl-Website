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
        const pastries = data.menu_menu.filter(item =>
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
                            <svg 
                                class="heart-icon"
                                data-id="${pastry.id}"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="28" 
                                height="28"
                                onclick="AddtoWish(${pastry.id}); toggleHeart(this);">
                                <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
                // If the item is already in the wish list, remove it
                delete existingWish[id];
                
                // Find the heart icon in the menu and remove the 'active' class
                const heartIcon = document.querySelector(`.heart-icon[data-id="${id}"]`);
                if (heartIcon) {
                    heartIcon.classList.remove('active');
                }
            } else {
                // If the item is not in the wish list, add it
                existingWish[id] = { id: id, quantity: 1 };
                
                // Find the heart icon in the menu and add the 'active' class
                const heartIcon = document.querySelector(`.heart-icon[data-id="${id}"]`);
                if (heartIcon) {
                    heartIcon.classList.add('active');
                }
            }
            
            // Update local storage with the new wish list
            localStorage.setItem("wishData", JSON.stringify(existingWish));
            
            // Optionally, refresh the wishlist UI
            if (typeof displayWish === "function") {
                displayWish(); // Ensure this function is defined elsewhere
            }
        }
        
        
        // Toggle heart icon appearance
        function toggleHeart(heartElement) {
            heartElement.classList.toggle('active');
        }

$(document).ready(function () {
    let currentIndex = 0; // Index to keep track of the current displayed items
    const itemsPerPage = 3; // Number of items to display at once

    // Fetch the data from data.json
    $.getJSON("../data.json", function (data) {
        // Filter the items with "Drink" in their categories
        const drinks = data.menu_menu.filter(item =>
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
                            <svg 
                                class="heart-icon" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="28" 
                                height="28"
                                onclick="AddtoWish(${drink.id}); toggleHeart(this);">
                                <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
        const sweets = data.menu_menu.filter(item =>
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
                            <svg 
                                class="heart-icon" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="28" 
                                height="28"
                                onclick="AddtoWish(${sweet.id}); toggleHeart(this);">
                                <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
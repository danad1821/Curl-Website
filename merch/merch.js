
$(document).ready(function () {
    $("#header").load("../Header/header.html");

    $("#footer").load("../footer/footer.html");
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("merch.json")
      .then(response => response.json())
      .then(data => {
        const merchContainer = document.getElementById("merch-content");
  
        data.products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
    
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add("product-image");

            const productName = document.createElement("h2");
            productName.textContent = product.name;
            productName.classList.add("product-name");

            const priceAndSelectorContainer = document.createElement("div");
            priceAndSelectorContainer.classList.add("price-and-selector-container");

            const price = document.createElement("p");
            price.textContent = `$${product.price}`;
            price.classList.add("price-label");

            const selector = document.createElement("div");
            selector.classList.add("selector");

            const quantityControl = document.createElement("div");
            quantityControl.classList.add("quantity-control");

            const minusBtn = document.createElement("button");
            minusBtn.textContent = "-";
            minusBtn.classList.add("control-btn");

            const quantity = document.createElement("p");
            quantity.textContent = "1";
            quantity.classList.add("quantity-label");

            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.classList.add("control-btn");

            minusBtn.addEventListener("click", () => {
                let currentQuantity = parseInt(quantity.textContent);
                if (currentQuantity > 1) {
                    quantity.textContent = currentQuantity - 1;
                }
            });

            plusBtn.addEventListener("click", () => {
                let currentQuantity = parseInt(quantity.textContent);
                quantity.textContent = currentQuantity + 1;
            });

            const addButton = document.createElement("button");
            addButton.textContent = "Add";
            addButton.classList.add("add-btn");

            addButton.addEventListener("click", () => {
                const currentQuantity = parseInt(quantity.textContent);
                if (currentQuantity > 0) {
                    console.log(`Added ${currentQuantity} of ${product.name} to the cart.`);
                    quantity.textContent = "0"; // Reset the quantity
                } else {
                    console.log(`No quantity selected for ${product.name}.`);
                }

                const $heartIcon = $("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='heartIcon merchHeartIcon'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z'/></svg>");
            });

            quantityControl.appendChild(minusBtn);
            quantityControl.appendChild(quantity);
            quantityControl.appendChild(plusBtn);
            selector.appendChild(price);

            selector.appendChild(quantityControl);
            selector.appendChild(addButton);

            priceAndSelectorContainer.appendChild(selector);

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(priceAndSelectorContainer);

            merchContainer.appendChild(productCard);
        });
      })
      .catch(error => console.error("Error loading products:", error));
  });
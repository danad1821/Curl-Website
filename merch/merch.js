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
//signin js
const $modal = $("#signInModal");
const $btn = $("#signInBtn");
const $closeBtn = $(".remove-signin");

const $singUpBtn = $("#signUpBtn");
const $signUpModal = $("#signUpModal");

const $signInBtnInModal = $("#signInBtnInModal");

// Show the modal when the "Sign In" button is clicked
$btn.on("click", function (event) {
  event.preventDefault();
  $modal.addClass("show");
});

// Hide the modal when the close button is clicked
$closeBtn.on("click", function () {
  $modal.removeClass("show");
});

$singUpBtn.on("click", function (event) {
  event.preventDefault();
  $signUpModal.addClass("show");
  $modal.removeClass("show");
})

$signInBtnInModal.on("click", function (event) {
  event.preventDefault();
  $signUpModal.removeClass("show");
  $modal.addClass("show");
})

const $searchContainer = $(".search-container");
const $searchInput = $(".search-input");
const $searchIcon = $("#search-icon");
const $closeIcon = $("#close-icon");
const $searchResults = $("#search-results");

// Show search container and focus input
$searchIcon.on("click", function (e) {
  e.preventDefault();
  $searchContainer.addClass("focused");
  $searchInput.focus();
});

// Close search container and clear input
$closeIcon.on("click", function (e) {
  e.preventDefault();
  $searchContainer.removeClass("focused");
  $searchInput.val("");
  $searchInput.blur();
  $searchResults.empty();
});

// Fetch data with jQuery
let data = {};

$.ajax({
  url: "../data.json",
  method: "GET",
  dataType: "json",
  success: function (jsonData) {
    data = jsonData;
  },
  error: function (xhr, status, error) {
    console.error("Error loading data:", error);
  },
});

// Handle search input
$searchInput.on("input", function () {
  const query = $searchInput.val().toLowerCase().trim();

  if (query.length === 0) {
    $searchResults.empty();
    return;
  }

  const allData = [...data.books, ...data.menu, ...data.merch, ...data.quotes];

  const filteredResults = allData.filter((item) => {
    // Search for books
    if (item.title || item.author || item.genres) {
      return (
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.genres &&
          item.genres.some((genre) => genre.toLowerCase().includes(query)))
      );
    }

    // Search for menu items
    if (item.name || item.categories) {
      return (
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.categories &&
          item.categories.some((category) =>
            category.toLowerCase().includes(query)
          ))
      );
    }

    // Search for merch
    if (item.name) {
      return item.name && item.name.toLowerCase().includes(query);
    }

    // Search for quotes
    if (item.author || item.book) {
      return (
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.book && item.book.toLowerCase().includes(query))
      );
    }

    return false;
  });

  $searchResults.empty();

  filteredResults.forEach((item) => {
    const $listItem = $("<li>").addClass("search-item");

    let imgElement = "";
    let title = "";
    let description = "";
    let author = ""; // Variable to hold the author's name

    // Handle books
    if (item.title) {
      title = item.title;
      description = truncateText(item.summary); // Shorten the summary to 6 words
      author = item.author ? `By: ${item.author}` : ""; // Include author if available
      imgElement = item.img
        ? `<img src="${item.img}" alt="Book image" class="search-image">`
        : "";
    }

    // Handle menu items
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description); // Shorten the description to 6 words
      imgElement = item.img
        ? `<img src="${item.img}" alt="Menu item image" class="search-image">`
        : "";
    }

    // Handle merch
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description); // Shorten the description to 6 words
      imgElement = item.img
        ? `<img src="${item.img}" alt="Merch image" class="search-image">`
        : "";
    }

    // Handle quotes
    else if (item.content) {
      title = item.book ? item.book : item.author;
      description = truncateText(item.content); // Shorten the content to 6 words
      author = item.author ? `By: ${item.author}` : ""; // Include author if available
      imgElement = "";
    }

    // Append the result, ensuring the author is under the description
    $listItem.append(
      imgElement,
      `<div class="text-container">
        <h3>${title}</h3>
        <p>${description}</p>
        ${author ? `<p class="author-name">${author}</p>` : ""}
      </div>`
    );

    $searchResults.append($listItem);
  });
});

// Helper function to truncate text
function truncateText(text) {
  const words = text.split(" ");
  if (words.length > 6) {
    return words.slice(0, 6).join(" ") + "...";
  }
  return text;
}

//burger js
$(document).ready(function () {
  $("#burgerIcon").click(function () {
    $("#navList").slideToggle();
    $("#closeIcon").slideToggle();
  });

  $("#closeIcon").click(function () {
    $("#navList").slideToggle();
    $(this).slideToggle();
    $("#burgerIcon").show();
  });

  //get all users
  let allUsers = [];
  $.ajax({
    url: "../user.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      allUsers = data.users;
    },
    error: function (error) {
      console.error("Error loading data:", error);
    },
  });

  //sign in


  $("#userProfileBtn").hide();
  $("#signInBtn").show();
  if (sessionStorage.getItem("loggedInUser")) {
    $("#userProfileBtn").show();
    $("#signInBtn").hide();
  }

  $("#sign-in-submit-btn").click(function (e) {
    e.preventDefault();
    let usernameOrEmail = $("#username").val();
    let password = $("#password").val();
    let userData = allUsers.find(
      (user) =>
        (user.username == usernameOrEmail || user.email == usernameOrEmail) &&
        user.password == password
    );
    if (userData) {
      $("#userProfileBtn").show();
      $("#signInBtn").hide();
      sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
      $modal.hide()
    } else {
      console.log("error");
    }
  });

  $("#userProfileBtn").click(function () {
    $(location).prop("href", "../profile/profile.html");
  });
});

//wish
$(document).ready(function () {
  const wishContainer = $("#wish-items");
  const wishlistCount = $("#wishlistItems");
  let wishData = JSON.parse(localStorage.getItem("wishData")) || {};

  // Fetch wishlist data and update the modal
  $.getJSON("../data.json", function (data) {
    const allItems = data.menu_menu.concat(data.books, data.merch, data.menu);

    // Function to update localStorage with new wishData
    function updateWishStorage() {
      localStorage.setItem("wishData", JSON.stringify(wishData));
    }

    // Function to update wishlist count
    function updateWishlistCount() {
      wishlistCount.text(Object.keys(wishData).length + " items");
    }

    // Function to render wishlist items in the UI
    function displayWish() {
      wishContainer.empty(); // Clear the current displayed items
      const wishItemsArray = Object.entries(wishData);

      const wishSpan = $(".wish-span");

      if (wishItemsArray.length === 0) {
        wishContainer.addClass("empty"); // Show empty state
        wishSpan.css({
          "margin-top": "40px",
        });
      } else {
        wishContainer.removeClass("empty"); // Remove empty state
        wishSpan.css({
          "margin-top": "-20px",
        });
        wishItemsArray.forEach(([id, item]) => {
          const product = allItems.find((p) => p.id == id);
          if (product) {
            const wishItem = `
                          <div class="wish-item">
                              <img src="${product.img}" alt="${product.name}" class="wish-img">
                              <button class="remove-wish" data-id="${id}" aria-label="Remove item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35" fill="none" class='heartIcon'>
                                      <path d="M36.9156 3.09425C35.9382 2.11329 34.7778 1.33511 33.5005 0.804189C32.2233 0.273267 30.8543 0 29.4718 0C28.0892 0 26.7202 0.273267 25.443 0.804189C24.1657 1.33511 23.0053 2.11329 22.0279 3.09425L19.9995 5.12916L17.9711 3.09425C15.9968 1.11369 13.3192 0.00102659 10.5272 0.00102661C7.73523 0.00102664 5.05759 1.11369 3.08335 3.09425C1.10911 5.07481 2.0802e-08 7.76103 0 10.562C-2.0802e-08 13.3629 1.10911 16.0491 3.08335 18.0297L19.9995 35L36.9156 18.0297C37.8935 17.0492 38.6691 15.885 39.1984 14.6037C39.7276 13.3223 40 11.9489 40 10.562C40 9.17499 39.7276 7.80161 39.1984 6.52027C38.6691 5.23894 37.8935 4.07476 36.9156 3.09425Z" fill="#E9B9B9"/>
                                  </svg>
                              </button>
                          </div>
                      `;
            wishContainer.append(wishItem);
          }
        });
      }
      updateWishlistCount(); // Update wishlist count
    }

    // Remove an item from the wishlist
    wishContainer.on("click", ".remove-wish", function () {
      const id = $(this).data("id");
      delete wishData[id];
      updateWishStorage();
      displayWish(); // Re-render the wishlist after removal
    });

    // Initial render of the wishlist
    displayWish();

    // Update wishlist when an item is added to the wish list
    window.AddtoWish = function (id) {
      if (!wishData[id]) {
        wishData[id] = { id: id, quantity: 1 };
      } else {
        delete wishData[id]; // Remove if it already exists
      }
      updateWishStorage();
      displayWish(); // Re-render the wishlist after adding/removing an item
    };
  });

  // Open wishlist modal when the heart icon is clicked
  $("#wishlist-btn").click(function () {
    $("#wishlist-modal").fadeIn();
  });

  $("#close-modal-btn").click(function () {
    $("#wishlist-modal").fadeOut();

    // Refresh all hearts in the menu
    const wishData = JSON.parse(localStorage.getItem("wishData")) || {};
    document.querySelectorAll(".heart-icon").forEach((heart) => {
      const id = heart.getAttribute("data-id");
      if (wishData[id]) {
        heart.classList.add("active");
      } else {
        heart.classList.remove("active");
      }
    });
  });
});

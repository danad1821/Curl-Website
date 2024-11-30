//signin js
const $modal = $("#signInModal");
const $btn = $("#signInBtn");
const $closeBtn = $(".close");

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
  $signUpModal.removeClass("show");
});

$singUpBtn.on("click", function(event) {
  event.preventDefault();
  $signUpModal.addClass("show");
  $modal.removeClass("show");
})

$signInBtnInModal.on("click", function(event) {
  event.preventDefault();
  $signUpModal.removeClass("show");
  $modal.addClass("show");
})

// Hide the modal if clicking outside the modal content
$(window).on("click", function (event) {
  if ($(event.target).is($modal)) {
    $modal.removeClass("show");
  }
  if ($(event.target).is($signUpModal)) {
    $signUpModal.removeClass("show");
  }
});

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
  if(sessionStorage.getItem("loggedInUser")){
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

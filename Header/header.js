//signin js
const $modal = $("#signInModal");
const $btn = $("#signInBtn");
const $closeBtn = $(".close");

// Show the modal when the "Sign In" button is clicked
$btn.on("click", function(event) {
  event.preventDefault();
  $modal.addClass("show");
});

// Hide the modal when the close button is clicked
$closeBtn.on("click", function() {
  $modal.removeClass("show");
});

$(window).on("click", function(event) {
    if ($(event.target).is($modal)) {
        $modal.removeClass("show"); // Remove the "show" class to hide the modal if clicked outside the modal content
    }
});

//search js
const $searchContainer = $(".search-container");
const $searchInput = $(".search-input");
const $searchIcon = $("#search-icon");
const $closeIcon = $("#close-icon");
const $searchResults = $("#search-results");

$searchIcon.on("click", function(e) {
  e.preventDefault();
  $searchContainer.addClass("focused");
  $searchInput.focus();
});

$closeIcon.on("click", function(e) {
  e.preventDefault();
  $searchContainer.removeClass("focused");
  $searchInput.val('');
  $searchInput.blur();
});

let data = {};

fetch('../data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

$searchInput.on("input", function () {
  const query = $searchInput.val().toLowerCase().trim();

  if (query.length === 0) {
    $searchResults.empty();
    return;
  }

  const allData = [
    ...data.books,
    ...data.menu,
    ...data.merch,
    ...data.quotes
  ];

  const filteredResults = allData.filter(item => {
    // Search for books
    if (item.title || item.author || item.genres) {
      return (
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.genres && item.genres.some(genre => genre.toLowerCase().includes(query)))
      );
    }

    // Search for menu items
    if (item.name || item.categories) {
      return (
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.categories && item.categories.some(category => category.toLowerCase().includes(query)))
      );
    }

    // Search for merch
    if (item.name) {
      return (
        (item.name && item.name.toLowerCase().includes(query))
      );
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

  filteredResults.forEach(item => {
    const listItem = $("<li>").addClass("search-item");

    let imgElement = "";
    let title = "";
    let description = "";
    let author = "";  // Variable to hold the author's name

    // Handle books
    if (item.title) {
      title = item.title;
      description = truncateText(item.summary);  // shorten the summary to 6 words
      author = item.author ? `By: ${item.author}` : "";  // Include author if available
      imgElement = item.img ? `<img src="${item.img}" alt="Book image" class="search-image">` : "";
    }

    // Handle menu items
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description);  // shorten the description to 6 words
      imgElement = item.img ? `<img src="${item.img}" alt="Menu item image" class="search-image">` : "";
    }

    // Handle merch
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description);  // shorten the description to 6 words
      imgElement = item.img ? `<img src="${item.img}" alt="Merch image" class="search-image">` : "";
    }

    // Handle quotes
    else if (item.content) {
      title = item.book ? item.book : item.author;
      description = truncateText(item.content);  // shorten the content to 6 words
      author = item.author ? `By: ${item.author}` : "";  // Include author if available
      imgElement = "";
    }

    // Append the result, ensuring the author is under the description
    listItem.append(
      imgElement,
      `<h3>${title}</h3>`,
      `<p>${description}</p>`,
      author ? `<p class="author-name">${author}</p>` : ""  // Add author below the description
    );

    $searchResults.append(listItem);
  });
});

$searchIcon.on("click", function (e) {
  e.preventDefault();
  $searchContainer.addClass("focused");
  $searchInput.focus();
});

$closeIcon.on("click", function (e) {
  e.preventDefault();
  $searchContainer.removeClass("focused");
  $searchInput.val('');
  $searchInput.blur();
  $searchResults.empty();
});

// Showing first 6 words in the description
function truncateText(text) {
  const words = text.split(" ");
  if (words.length > 6) {
    return words.slice(0, 6).join(" ") + "...";
  }
  return text;
}

$searchInput.on("input", function () {
  const query = $searchInput.val().toLowerCase().trim();

  if (query.length === 0) {
    $searchResults.empty();
    return;
  }

  const allData = [
    ...data.books,
    ...data.menu,
    ...data.merch,
    ...data.quotes
  ];

  const filteredResults = allData.filter(item => {
    // Search for books
    if (item.title || item.author || item.genres) {
      return (
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.genres && item.genres.some(genre => genre.toLowerCase().includes(query)))
      );
    }

    // Search for menu items
    if (item.name || item.categories) {
      return (
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.categories && item.categories.some(category => category.toLowerCase().includes(query)))
      );
    }

    // Search for merch
    if (item.name) {
      return (
        (item.name && item.name.toLowerCase().includes(query))
      );
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

  filteredResults.forEach(item => {
    const listItem = $("<li>").addClass("search-item");

    let imgElement = "";
    let title = "";
    let description = "";
    let author = "";  // Variable to hold the author's name

    // Handle books
    if (item.title) {
      title = item.title;
      description = truncateText(item.summary);  // shorten the summary to 6 words
      author = item.author ? `By: ${item.author}` : "";  // Include author if available
      imgElement = item.img ? `<img src="${item.img}" alt="Book image" class="search-image">` : "";
    }

    // Handle menu items
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description);  // shorten the description to 6 words
      imgElement = item.img ? `<img src="${item.img}" alt="Menu item image" class="search-image">` : "";
    }

    // Handle merch
    else if (item.name) {
      title = item.name;
      description = truncateText(item.description);  // shorten the description to 6 words
      imgElement = item.img ? `<img src="${item.img}" alt="Merch image" class="search-image">` : "";
    }

    // Handle quotes
    else if (item.content) {
      title = item.book ? item.book : item.author;
      description = truncateText(item.content);  // shorten the content to 6 words
      author = item.author ? `By: ${item.author}` : "";  // Include author if available
      imgElement = "";
    }

    // Append the result, ensuring the author is under the description
    listItem.append(
      imgElement,
      `<div class="text-container">
        <h3>${title}</h3>
        <p>${description}</p>
        ${author ? `<p class="author-name">${author}</p>` : ""}
      </div>`
    );
    

    $searchResults.append(listItem);
  });
});

//burger js
$(document).ready(function() {
  $('#burgerIcon').click(function() {
      $("#navList").slideToggle();
      $('#closeIcon').slideToggle();
  });

  $('#closeIcon').click(function() {
      $('#navList').slideToggle();
      $(this).slideToggle();
      $('#burgerIcon').show();
  });
});
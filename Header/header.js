// Select elements for the modal
const $modal = $("#signInModal");
const $btn = $("#signInBtn");
const $closeBtn = $(".close");

// Show the modal when the "Sign In" button is clicked
$btn.on("click", function(event) {
  event.preventDefault(); // Prevent the default action 
  $modal.addClass("show"); // Add the "show" class to the modal to display it
});

// Hide the modal when the close button is clicked
$closeBtn.on("click", function() {
  $modal.removeClass("show"); // Remove the "show" class to hide the modal
});

// Hide the modal when the user clicks outside of the modal content area
$(window).on("click", function(event) {
    if ($(event.target).is($modal)) { // Check if the click event's target is the modal background
        $modal.removeClass("show"); // Remove the "show" class to hide the modal if clicked outside the modal content
    }
});

// Select elements for the search container
const $searchContainer = $(".search-container");
const $searchInput = $(".search-input");
const $searchIcon = $("#search-icon");
const $closeIcon = $("#close-icon");

$searchIcon.on("click", function(e) {
  e.preventDefault(); // Prevent any default action
  $searchContainer.addClass("focused"); // Add the "focused" class to expand the container
  $searchInput.focus(); // Set focus on the input field so the user can start typing immediately
});

// Collapse the search container, clear the input field, and remove focus when the close icon is clicked
$closeIcon.on("click", function(e) {
  e.preventDefault(); // Prevent any default action
  $searchContainer.removeClass("focused"); // Remove the "focused" class to collapse the container
  $searchInput.val(''); // Clear any text entered in the input field
  $searchInput.blur(); // Remove focus from the input field
});
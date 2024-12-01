$(document).ready(function () {
    console.log("hello")
    $("#header").load("../Header/header.html");

    $("#footer").load("../footer/footer.html");
});
const reserveButtons = document.querySelectorAll('.reserve-btn');
const reservationForm = document.getElementById('reservationForm');
const closeButton = document.querySelector('.close-btn');


reserveButtons.forEach(button => {
  button.addEventListener('click', () => {
    reservationForm.style.display = 'flex';
  });
});

reservationForm.addEventListener('click', (event) => {
  if (event.target === reservationForm) {
    reservationForm.style.display = 'none';
  }
});
closeButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent the click event from bubbling up
  reservationForm.style.display = 'none';
});

$(document).ready(function () {
    console.log("hello")
    $("#header").load("../Header/header.html");

    $("#footer").load("../footer/footer.html");
});
const reserveButtons = document.querySelectorAll('.reserve-btn');
const reservationForm = document.getElementById('reservationForm');

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

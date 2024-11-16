fetch('../data.json') // Go up one level to fetch data.json
    .then(response => response.json())
    .then(data => {
        const reviews = data.reviews;
        reviews.forEach((review, index) => {
            const reviewCard = document.getElementById(`review-${index + 1}`);
            
            // Create star rating
            const starsDiv = document.createElement('div');
            starsDiv.className = 'star-rating';

            // Create the stars based on the rating
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                if (i < review.rating) {
                    star.className = 'full-star'; // Full star for ratings
                } else {
                    star.className = 'empty-star'; // Empty star for remaining
                }
                star.textContent = '★';
                starsDiv.appendChild(star);
            }

            // Add the stars and review content to the card
            reviewCard.innerHTML = ` 
                <p>"${review["review-content"]}"</p>
<<<<<<< HEAD
                <p> <b> ${review["review-author"]} </b> </p>
=======
                <p>${review["review-author"]}</p>
>>>>>>> 7be797846d2dbb7cf17b7fabfc42c6521b4484ec
            `;
            reviewCard.prepend(starsDiv); // Prepend the stars to the card
        });
    })
    .catch(error => console.error('Error fetching data:', error));

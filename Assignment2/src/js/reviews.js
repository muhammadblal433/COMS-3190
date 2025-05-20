document.addEventListener("DOMContentLoaded", function () {
    let reviewsContainer = document.getElementById("reviewsContainer");
    
    let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (!Array.isArray(storedReviews) || storedReviews.length === 0) {
        let noReviewsMessage = document.createElement("p");
        noReviewsMessage.classList.add("text-center", "text-muted", "mt-3");
        noReviewsMessage.textContent = "No reviews have been submitted yet.";
        reviewsContainer.appendChild(noReviewsMessage);
        return;
    }

    // Fetch all movie data to get poster images
    Promise.all([
        fetch("../assets/movies1.json").then(res => res.json()),
        fetch("../assets/movies2.json").then(res => res.json()),
        fetch("../assets/movies3.json").then(res => res.json())
    ])
    .then(([movies1, movies2, movies3]) => {
        let allMovies = [...(movies1.movies1 || []), ...(movies2.movies2 || []), ...(movies3.movies3 || [])];

        // Clear container to prevent duplicate reviews on refresh
        reviewsContainer.innerHTML = ""; 

        storedReviews.forEach(review => {
            // Find movie in JSON files
            let movieData = allMovies.find(movie => movie.title === review.movie);
            // Empty placeholder
            let posterURL = movieData ? movieData.poster : ""; 

            let reviewCard = document.createElement("div");
            reviewCard.classList.add("col-md-4", "mb-4");

            reviewCard.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${posterURL}" class="card-img-top img-fluid" alt="${review.movie}">
                    <div class="card-body">
                        <h5 class="card-title">${review.movie}</h5>
                        <p class="text-muted">${review.date}</p>
                        <p class="card-text"><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
                        <p class="card-text">${review.review}</p>
                    </div>
                </div>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    })
    .catch(error => console.error("Error loading movie data:", error));
});

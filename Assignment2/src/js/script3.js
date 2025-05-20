let allMovies = [];

fetch("../assets/movies3.json")
  .then(response => response.json())
  .then(myMovies => {
    allMovies = myMovies.movies3;
    loadMovies(allMovies);
  });

function loadMovies(movies) {
    let movieContainer = document.getElementById("col");
    movieContainer.innerHTML = ""; // Clear previous movies

    movies.forEach(movie => {
        let { title, year, poster, genre, director, cast, description } = movie;

        let movieCard = document.createElement("div");
        movieCard.classList.add("col");

        movieCard.innerHTML = `
            <div class="card shadow-sm movie-card">
                <img src="${poster}" class="card-img-top img-fluid" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title} (${year})</h5>
                    <p class="card-text"><strong>Genre:</strong> ${genre}</p>
                    <p class="card-text"><strong>Director:</strong> ${director}</p>
                    <p class="card-text"><strong>Cast:</strong> ${cast.join(", ")}</p>
                    <p class="card-text">${description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-outline-primary" onclick="writeReview('${title}')">Write Review</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="viewReviews('${title}')">View Reviews</button>
                    </div>
                </div>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}

// Search functionality
document.getElementById("searchBar").addEventListener("input", function() {
    let searchTerm = this.value.toLowerCase();
    let filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    loadMovies(filteredMovies);
});

// Functions for Write Review and View Reviews
function writeReview(title) {
    window.location.href = `writeReview.html?movie=${encodeURIComponent(title)}`;
}

function viewReviews(title) {
    window.location.href = `reviews.html?movie=${encodeURIComponent(title)}`;
}

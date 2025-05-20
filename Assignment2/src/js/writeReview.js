document.addEventListener("DOMContentLoaded", function () {
    let movieDropdown = document.getElementById("movieDropdown");

    if (!movieDropdown) {
        console.error("Dropdown element not found!");
        return;
    }

    // Fetch all movies from the three JSON files
    Promise.all([
        fetch("../assets/movies1.json").then(res => res.json()),
        fetch("../assets/movies2.json").then(res => res.json()),
        fetch("../assets/movies3.json").then(res => res.json())
    ])
    .then(([movies1, movies2, movies3]) => {
        console.log("Movies loaded successfully:", movies1, movies2, movies3); 

        let allMovies = [];

        allMovies = allMovies.concat(movies1.movies1 || movies1);
        allMovies = allMovies.concat(movies2.movies2 || movies2);
        allMovies = allMovies.concat(movies3.movies3 || movies3);

        populateMovieDropdown(allMovies); 
    })
    .catch(error => console.error("Error loading JSON files:", error));

    function populateMovieDropdown(movies) {
        movieDropdown.innerHTML = '<option value="" disabled selected>Select a movie</option>'; 
        movies.forEach(movie => {
            let option = document.createElement("option");
            option.value = movie.title;
            option.textContent = movie.title;
            movieDropdown.appendChild(option);
        });
    }
});

document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let selectedMovie = document.getElementById("movieDropdown").value;
    let reviewText = document.getElementById("reviewText").value.trim();
    let rating = document.querySelector('input[name="rating"]:checked');

    if (!selectedMovie || !reviewText || !rating) {
        alert("Please complete all fields.");
        return;
    }

    let reviewData = {
        movie: selectedMovie,
        review: reviewText,
        rating: parseInt(rating.value), 
        date: new Date().toLocaleString() 
    };

    let reviews = localStorage.getItem("reviews");

    try {
        reviews = JSON.parse(reviews);
        if (!Array.isArray(reviews)) {
            reviews = []; // Ensure it's an array
        }
    } catch (error) {
        reviews = []; // Reset if parsing fails
    }

    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Review submitted successfully!");
    window.location.href = "reviews.html"; 
});

// Handle Cancel Button
function cancelReview() {
    window.location.href = "index.html";
}

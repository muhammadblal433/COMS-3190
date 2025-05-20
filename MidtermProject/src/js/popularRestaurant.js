document.addEventListener("DOMContentLoaded", () => {
    //fetching data from the json file
    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => loadRestaurants(data.restaurants))
        .catch(error => console.error("Error loading restaurant data:", error));
});

//load restaurants dynimacally with bootstrap css
function loadRestaurants(restaurants) {
    //Store the elements in in the const
    const restaurantsContainer = document.getElementById("restaurants-container");
        //map function returns array of strings and join combines them into a single string
    restaurantsContainer.innerHTML = restaurants.map((restaurant, index) => `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm" id="pop" style="border-radius: 15px">
                <img src="${restaurant.img}" class="card-img-top-logo" alt="${restaurant.name}">
                <div class="card-body">
                    <h5 class="card-title">${restaurant.name}</h5>
                    <p class="card-text"><strong>Type:</strong> ${restaurant.type}</p>
                    <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" 
                        data-bs-target="#restaurantModal" onclick="showRestaurant(${index})">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    window.restaurantsData = restaurants; //this is storing the restaurant data basically for ease of use
}

//Show restaurant when it comes to using the modal feature of this card
function showRestaurant(index) {
    let restaurant = window.restaurantsData[index];

    //Set modal content
    document.getElementById("restaurantModalLabel").textContent = restaurant.name;
    document.getElementById("restaurantModalType").textContent = `Type: ${restaurant.type}`;

    //inserting the image
    let modalImg = document.getElementById("restaurantModalImg");
    modalImg.src = restaurant.img;
    modalImg.alt = restaurant.name;

    //Fill menu list from the json when clicking "View Details"
    let menuList = document.getElementById("restaurantModalMenu");
    menuList.innerHTML = "";
    restaurant.popularItems.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${item.itemName}</strong> - ${item.calories} kcal, Protein: ${item.protein}, Carbs: ${item.carbs}, Fat: ${item.fat}`;
        menuList.appendChild(li);
    });
}

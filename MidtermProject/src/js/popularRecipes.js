document.addEventListener("DOMContentLoaded", () => {
    //fetching data from the json file
    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => loadRecipes(data.recipes))
        //catch the errors when there is knt data or it cant load
        .catch(error => console.error("Error loading recipes:", error));
});

//loads recipes dynimacally with bootstrap css
function loadRecipes(recipes) {
    //Store the elements in in the const
    const recipesContainer = document.getElementById("recipes-container");
    //map function returns array of strings and join combines them into a single string
    recipesContainer.innerHTML = recipes.map((recipe, index) => `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm" id="pop" style="border-radius: 15px">
                <img src="${recipe.img}" class="card-img-top-food" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Published: ${recipe.year}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" 
                            data-bs-target="#recipeModal" onclick="showRecipe(${index})">
                            View Recipe
                        </button>
                        <span class="fw-bold text-muted">$${recipe.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    window.recipesData = recipes;
}

//Show recipe when it comes to using the modal feature of this card
function showRecipe(index) {
    let recipe = window.recipesData[index];

    //Set modal content
    document.getElementById("recipeModalLabel").textContent = recipe.title;
    document.getElementById("recipeModalImg").src = recipe.img;
    document.getElementById("recipeModalInstructions").textContent = recipe.instructions;

    //Fill ingredients list from the json
    let ingredientsList = document.getElementById("recipeModalIngredients");
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
}

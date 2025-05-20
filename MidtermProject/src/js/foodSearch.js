//keys for the API
const APP_ID = "509ee89b";
const API_KEY = "01a395df7cbb5cd60e3bb81e442f0a95";

//Nutrient mapping for Nutritionix API
const nutrientMapping = {
    208: "Calories (kcal)",
    204: "Total Fat (g)",
    606: "Saturated Fat (g)",
    605: "Trans Fat (g)",
    601: "Cholesterol (mg)",
    307: "Sodium (mg)",
    205: "Total Carbohydrates (g)",
    291: "Dietary Fiber (g)",
    269: "Sugars (g)",
    539: "Added Sugars (g)",
    203: "Protein (g)",
    306: "Potassium (mg)",
    324: "Vitamin D (IU)",
    301: "Calcium (mg)",
    303: "Iron (mg)"
};

//function to get the nutrition data from Nutritionix API
async function fetchNutrition() {
    const query = document.getElementById("foodInput").value;
    if (!query) {
        alert("Please enter a food item.");
        return;
    }
    
    //url
    const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": APP_ID,
            "x-app-key": API_KEY
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    displayResult(data);
}

//Function to show the result of the mapping so that the user can see the qualities of the food they are searching
function displayResult(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";


    //Use HTML elements throughout to display the results in a clean fashionusing bootstrap css for styling
    if (data.foods && data.foods.length > 0) {
        data.foods.forEach(food => {
            let nutrientHTML = "<ul class='list-group list-group-flush'>";

            food.full_nutrients.forEach(nutrient => {
                if (nutrientMapping[nutrient.attr_id]) {
                    nutrientHTML += `<li class="list-group-item"><strong>${nutrientMapping[nutrient.attr_id]}:</strong> ${nutrient.value}</li>`;
                }
            });

            nutrientHTML += "</ul>";

            resultDiv.innerHTML += `
                <div class="card shadow-sm mt-4 p-3">
                    <h4 class="fw-bold text-primary">${food.food_name}</h4>
                    <p><strong>Serving Size:</strong> ${food.serving_qty} ${food.serving_unit}</p>
                    ${nutrientHTML}
                </div>
            `;

            //All possible nutritions that can be displayed and allows for some to be ommitted if the food does not contain them
            $(`#nutrition-label-${food.food_name.replace(/\s+/g, '-')}`).nutritionLabel({
                showItemName: true,
                itemName: food.food_name,
                showServingsPerContainer: true,
                valueServingUnitQuantity: food.serving_qty,
                valueServingSizeUnit: food.serving_unit,
                valueCalories: food.nf_calories || 0,
                valueFatCalories: food.nf_calories ? (food.nf_calories * 0.25) : 0,
                valueTotalFat: food.nf_total_fat || 0,
                valueSatFat: food.nf_saturated_fat || 0,
                valueTransFat: food.nf_trans_fatty_acid || 0,
                valueCholesterol: food.nf_cholesterol || 0,
                valueSodium: food.nf_sodium || 0,
                valueTotalCarb: food.nf_total_carbohydrate || 0,
                valueSugars: food.nf_sugars || 0,
                valueAddedSugars: food.nf_added_sugars || 0,
                valueProteins: food.nf_protein || 0,
                valueVitaminD: food.nf_vitamin_d_mcg || 0,
                valuePotassium_2018: food.nf_potassium || 0,
                valueCalcium: food.nf_calcium_mg || 0,
                valueIron: food.nf_iron_mg || 0,
                showLegacyVersion: false
            });
        });
    } else {
        //End case if nothing is found
        resultDiv.innerHTML = "<p class='text-danger'>No results found.</p>";
    }
}

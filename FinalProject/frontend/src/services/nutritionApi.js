const APP_ID = "509ee89b";
const API_KEY = "01a395df7cbb5cd60e3bb81e442f0a95";

//key nutrient maps
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
  303: "Iron (mg)",
};

//use the api
export const fetchNutrition = async (query) => {
  const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": APP_ID,
      "x-app-key": API_KEY,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  //Add humanreadable names to each nutrient
  if (data.foods) {
    data.foods.forEach(food => {
      food.full_nutrients = food.full_nutrients
        .filter(n => nutrientMapping[n.attr_id])
        .map(n => ({
          name: nutrientMapping[n.attr_id],
          value: n.value
        }));
    });
  }

  return data;
};

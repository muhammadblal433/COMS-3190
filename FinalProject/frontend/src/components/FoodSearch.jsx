import React, { useState } from "react";
import { fetchNutrition } from "../services/nutritionApi";
import "../index.css";

const FoodSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return alert("Please enter a food item.");
    const data = await fetchNutrition(query);
    setResults(data.foods || []);
  };

  return (
    <div className="bg-white">
      {/* Search Section */}
      <section className="section-padding pb-5" style={{ backgroundColor: "#D6A184" }}>
        <div className="container text-center">
          <h1 className="fw-bold">Food Search</h1>
          <p className="text-muted">Enter a food item to get its nutritional information</p>
          <div className="search-container mx-auto" style={{ maxWidth: "600px" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              placeholder="Enter a food item"
            />
            <button className="btn btn-primary w-100 mt-3" onClick={handleSearch} style={{ backgroundColor: "#A87C5F" }}>
              Get Nutrition Info
            </button>
          </div>

          <div className="mt-4 text-start">
            {results.length === 0 && <p className="text-muted"></p>}
            {results.map((food, idx) => (
              <div key={idx} className="card shadow-sm mt-4 p-3">
                <h4 className="fw-bold text-primary">{food.food_name}</h4>
                <p><strong>Serving Size:</strong> {food.serving_qty} {food.serving_unit}</p>
                <ul className="list-group list-group-flush">
                  {food.full_nutrients.map((nutrient, index) => (
                    <li className="list-group-item" key={index}>
                      <strong>{nutrient.name}:</strong> {nutrient.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* How To Use Section */}
<section className="py-5 text-center bg-light">
  <div className="container">
    <h2 className="fw-bold mb-4">How To Use It</h2>

    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm p-4 border-0">
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item mb-3 fs-5">
              <strong>Step 1:</strong> Type the name of any food item into the search bar (e.g., "Apple," "Pizza," "Chicken Breast").
            </li>
            <li className="list-group-item mb-3 fs-5">
              <strong>Step 2:</strong> Click the <span className="text-primary">"Get Nutrition Info"</span> button.
            </li>
            <li className="list-group-item mb-3 fs-5">
              <strong>Step 3:</strong> The page will display detailed nutrition facts, including calories, protein, carbohydrates, and fat.
            </li>
            <li className="list-group-item fs-5">
              <strong>Step 4:</strong> Use this tool to track your food intake and make informed healthy choices.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default FoodSearch;

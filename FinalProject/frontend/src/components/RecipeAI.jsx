import React, { useState } from "react";
import axios from "axios";
import { fetchNutrition } from "../services/nutritionApi";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RecipeAI = () => {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    exercise: 'None',
    meal: 'Breakfast',
  });
  const [response, setResponse] = useState('');
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNutrition([]);
    try {
      const res = await axios.post('http://localhost:3000/api/generate-recipe', {
        age: form.age,
        weight: form.weight,
        height: form.height,
        exercise: form.exercise,
        meal: form.meal,
      });
  
      const aiText = res.data.output || 'No recipe generated.';
      setResponse(aiText);
  
      // Extract Meal Name using regex
      const match = aiText.match(/Recipe:\s*(.*)/);
      const mealName = match ? match[1].trim() : null;
  
      if (mealName) {
        const nutritionData = await fetchNutrition(mealName);
        setNutrition(nutritionData.foods || []);
      }
    } catch (err) {
      console.error(err);
      setResponse('Error generating recipe.');
    }
  
    setLoading(false);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: "#D6A184" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>AI-Powered Recipe Suggestions</h2>
          <p className="lead">Enter your profile below and let our AI suggest healthy, personalized meals.</p>
        </div>

        {/* form for the ai */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input name="age" type="number" value={form.age} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Weight</label>
              <input name="weight" type="text" placeholder="e.g., 150 lbs" value={form.weight} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Height</label>
              <input name="height" type="text" placeholder="e.g., 5'10&quot;" value={form.height} onChange={handleChange} className="form-control" required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Exercise Level</label>
              <select name="exercise" value={form.exercise} onChange={handleChange} className="form-select">
                <option>None</option>
                <option>A little</option>
                <option>Medium amount</option>
                <option>A lot</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Meal Type</label>
              <select name="meal" value={form.meal} onChange={handleChange} className="form-select">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
              {loading ? 'Generating...' : 'Get Recipes'}
            </button>
          </div>
        </form>

        {response && (
          <div className="bg-light p-4 border rounded shadow-sm mb-4">
            <h5>AI-Generated Suggestions:</h5>
            <pre className="ai-suggestion">{response}</pre>
          </div>
        )}



        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {nutrition.map((food, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100 shadow-sm small" style={{ fontSize: "0.85rem" }}>
                <div className="card-body">
                  <h6 className="fw-bold mb-2" style={{ color: '#2a6041' }}>
                    {food.food_name
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </h6>
                  <p className="mb-1">
                    <strong>Serving Size:</strong> {food.serving_qty} {food.serving_unit}
                  </p>
                  <ul className="list-group list-group-flush">
                    {food.full_nutrients.map((nutrient, index) => (
                      <li className="list-group-item py-1 px-2" key={index}>
                        <strong>{nutrient.name}:</strong> {nutrient.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeAI;

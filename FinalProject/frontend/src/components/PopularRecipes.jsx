import React, { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true });

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    year: "",
    img: "",
    price: "",
    ingredients: "",
    instructions: ""
  });

  // get recipe from the db
  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const openViewModal = (recipe) => {
    setSelectedRecipe(recipe);
    const modal = new window.bootstrap.Modal(document.getElementById('recipeModal'));
    modal.show();
  };

  const openFormModal = (recipe = null) => {
    setIsEditing(!!recipe);
    if (recipe) {
      setForm({
        ...recipe,
        ingredients: recipe.ingredients?.join("\n") || ""
      });
    } else {
      setForm({
        title: "",
        year: "",
        img: "",
        price: "",
        ingredients: "",
        instructions: ""
      });
    }
    const modal = new window.bootstrap.Modal(document.getElementById('formModal'));
    modal.show();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // prevents the page from redirecting to another page, so it stays on Popular Recipes page if we view, edit, or delete anything
  
    const recipeData = {
      ...form,
      ingredients: form.ingredients.split("\n").filter(Boolean),
      price: parseFloat(form.price),
      year: parseInt(form.year)
    };
  
    const { _id, ...cleanedRecipe } = recipeData;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/api/recipes/${form._id}`
      : `http://localhost:3000/api/recipes`;
  
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedRecipe)
      });
  
      const updated = await fetch("http://localhost:3000/api/recipes").then(res => res.json());
      setRecipes(updated);
  
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('formModal'));
      if (modal) modal.hide();
  
      setForm({
        title: "",
        year: "",
        img: "",
        price: "",
        ingredients: "",
        instructions: ""
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: "DELETE"
      });
      window.location.reload();
    }
  };

  return (
    <div className="bg-white">
      <section id="popularrecipies" className="section-padding" style={{ backgroundColor: "#D6A184" }}>
        <div className="container">
          <div className="text-center mb-4">
          <h2>Popular Recipes</h2>
          {localStorage.getItem("isDevAuthenticated") === "true" && (
          <button className="btn btn-success mt-2" onClick={() => openFormModal()}>Add New Recipe</button>
          )}
          </div>

          <div className="row g-4">
            {recipes.map((recipe, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm" id="pop" style={{ borderRadius: "15px" }}>
                  <img
                    src={images[recipe.img]?.default || ""}
                    className="card-img-top-food"
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">Published: {recipe.year}</p>
                    <p className="card-text"><strong>Price:</strong> ${typeof recipe.price === "number" ? recipe.price.toFixed(2) : "N/A"}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => openViewModal(recipe)}>View</button>
                        {localStorage.getItem("isDevAuthenticated") === "true" && (
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-warning" onClick={() => openFormModal(recipe)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(recipe._id)}>Delete</button>
                          </div>
                      )}
                    </div>            
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* View Modal */}
      <div className="modal fade" id="recipeModal" tabIndex="-1" aria-labelledby="recipeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {selectedRecipe && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedRecipe.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex">
                  <div className="w-50 pe-3">
                    <img src={images[selectedRecipe.img]?.default || ""} className="img-fluid rounded" alt={selectedRecipe.title} />
                  </div>
                  <div className="w-50">
                    <h6>Ingredients:</h6>
                    <ul>{selectedRecipe.ingredients?.map((item, i) => <li key={i}>{item}</li>)}</ul>
                    <h6>Instructions:</h6>
                    <p>{selectedRecipe.instructions}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? "Edit Recipe" : "Add Recipe"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleFormChange} className="form-control" />
              </div>
              <div className="mb-3 d-flex gap-3">
                <div className="w-50">
                  <label className="form-label">Year</label>
                  <input type="number" name="year" value={form.year} onChange={handleFormChange} className="form-control" />
                </div>
                <div className="w-50">
                  <label className="form-label">Price ($)</label>
                  <input type="number" step="0.01" name="price" value={form.price} onChange={handleFormChange} className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Image Path</label>
                <input type="text" name="img" value={form.img} onChange={handleFormChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Ingredients (one per line)</label>
                <textarea name="ingredients" value={form.ingredients} onChange={handleFormChange} className="form-control" rows="4" />
              </div>
              <div className="mb-3">
                <label className="form-label">Instructions</label>
                <textarea name="instructions" value={form.instructions} onChange={handleFormChange} className="form-control" rows="3" />
              </div>
              <button className="btn btn-success w-100 mt-3" onClick={(e) => handleFormSubmit(e)}>
              {isEditing ? "Update Recipe" : "Create Recipe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipes;

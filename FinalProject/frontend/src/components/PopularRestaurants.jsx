import React, { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true });

const PopularRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    img: "",
    popularItems: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  };

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    const modal = new window.bootstrap.Modal(document.getElementById('restaurantModal'));
    modal.show();
  };

  const openFormModal = (restaurant = null) => {
    setFormMode(restaurant ? "edit" : "add");
    setFormData(restaurant || {
      name: "",
      type: "",
      img: "",
      popularItems: [],
    });
    const modal = new window.bootstrap.Modal(document.getElementById('restaurantFormModal'));
    modal.show();
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/restaurants/${id}`, {
      method: "DELETE",
    }).then(fetchData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formMode === "add" ? "POST" : "PUT";
    const url = formMode === "add"
      ? "http://localhost:3000/api/restaurants"
      : `http://localhost:3000/api/restaurants/${formData._id}`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      fetchData();
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('restaurantFormModal'));
      modal.hide();
    });
  };

  return (
    <div className="bg-white">
      <section className="section-padding" style={{ backgroundColor: "#D6A184" }}>
        <div className="container">
          <div className="text-center mb-4">
          <h2>Popular Restaurants</h2>
          {localStorage.getItem("isDevAuthenticated") === "true" && (
          <button className="btn btn-success mt-3" onClick={() => openFormModal()}>Add New Restaurant</button>
          )}
          </div>

          <div className="row g-4">
            {restaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant._id}>
                <div className="card shadow-sm" id="pop" style={{ borderRadius: "15px" }}>
                  {restaurant.img && (
                    <img
                      src={images[restaurant.img]?.default || ""}
                      className="card-img-top-logo"
                      alt={restaurant.name}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text"><strong>Type:</strong> {restaurant.type}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(restaurant)}>View</button>
                        {localStorage.getItem("isDevAuthenticated") === "true" && (
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-warning" onClick={() => openFormModal(restaurant)}>Update</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(restaurant._id)}>Delete</button>
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
      <div className="modal fade" id="restaurantModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {selectedRestaurant && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedRestaurant.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body d-flex">
                  <div className="w-50 pe-3">
                    {selectedRestaurant.img && (
                      <img
                        src={images[selectedRestaurant.img]?.default || ""}
                        className="img-fluid rounded card-img-top-logo"
                        alt={selectedRestaurant.name}
                      />
                    )}
                  </div>
                  <div className="w-50">
                    <p><strong>Type:</strong> {selectedRestaurant.type}</p>
                    <h6>Popular Menu Items:</h6>
                    <ul>
                      {selectedRestaurant.popularItems?.map((item, idx) => (
                        <li key={idx}>
                          <strong>{item.itemName}</strong> — {item.calories} kcal, Protein: {item.protein}, Carbs: {item.carbs}, Fat: {item.fat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <div className="modal fade" id="restaurantFormModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{formMode === "add" ? "Add New Restaurant" : "Update Restaurant"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input className="form-control mb-2" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <input className="form-control mb-2" placeholder="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
              <input className="form-control mb-2" placeholder="Image path (e.g., ../assets/images/restaurants/McDonalds.jpg)" value={formData.img} onChange={e => setFormData({ ...formData, img: e.target.value })} />
              {/* For simplicity, not supporting direct editing of popularItems here */}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">{formMode === "add" ? "Create" : "Save Changes"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopularRestaurants;

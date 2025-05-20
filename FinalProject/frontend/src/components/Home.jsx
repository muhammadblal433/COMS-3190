import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChickenSalad from "../assets/images/homepage/ChickenSalad.png";
import HealthyLady from "../assets/images/homepage/HealthyLady.png";
import NutritionLabel from "../assets/images/homepage/NutritionLabel.jpg";

const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true });

const Home = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/popular-features")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Error fetching popular features:", err));
  }, []);

  const featureLinks = {
    "Nutrition Info Calculator": "/food-search",
    "Popular Recipes": "/popular-recipes",
    "Popular Restaurants": "/popular-restaurants"
  };

  return (
    <div className="bg-white">
      <section id="home" className="bg-primary-subtle section-padding pb-5 pb-md-0">
        <div className="container">
          <div className="row g-4 flex-row-reverse align-items-center">
            <div className="col-md-6 text-center">
              <img src={ChickenSalad} className="img-fluid" alt="Chicken Salad" />
            </div>
            <div className="col-md-6">
              <h1 className="mb-4">Start Your Journey to a Healthier You Today</h1>
              {[
                "Easy to Read Nutrition Labels",
                "Track Meals From Your Favorite Restaurant",
                "Become A Healthier You!"
              ].map((item, idx) => (
                <div key={idx} className="d-flex align-items-center icon mt-2">
                  <svg className="circle" width="22" height="22" fill="black">
                    <circle cx="11" cy="11" r="5"></circle>
                  </svg>
                  <p className="px-2 mb-0 fw-medium">{item}</p>
                </div>
              ))}

              {/* Using reactor route dom for both of our websites key features */}
              <div className="d-grid gap-3 mt-5 text-start">
              <Link to="/food-search" className="btn btn-primary text-start" style={{ width: "fit-content", padding: "0.75rem 2rem", fontSize: "1.1rem" }}>
              NUTRITION INFO CALCULATOR
              </Link>

              <Link to="/recipe-ai" className="btn btn-primary text-start" style={{ width: "fit-content", padding: "0.75rem 2rem", fontSize: "1.1rem" }}>
              <strong>NEW!</strong> AI NUTRITION
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <img src={HealthyLady} className="img-fluid" alt="Healthy Lady" />
            </div>
            <div className="col text-start">
              <h2 className="mb-4">Transform your life and embrace a healthier future</h2>
              <p>
                At EasyCal, we care about you and the food you eat. Our mission is to make
                nutrition simple, accessible, and enjoyable. Use our platform to explore a wide range of tools
                 and resources designed to help you make informed dietary choices. 
                 Whether you're looking to track your meals, discover new recipes, or learn about essential nutrients, EasyCal has you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-body-secondary py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Benefits of Using EasyCal for Better Nutrition</h2>
              <ul className="ps-0">
                {[
                  "Discover delicious and wholesome recipes that support a balanced diet.",
                  "Track your daily intake with ease and stay mindful of your nutrition.",
                  "Learn about essential nutrients and how they impact your well-being.",
                  "Make healthier choices effortlessly with our expert-backed resources."
                ].map((text, idx) => (
                  <li key={idx} className="d-flex align-items-center icon mt-2">
                    <svg className="circle" width="22" height="22"><circle cx="11" cy="11" r="5"></circle></svg>
                    <p className="px-2 mb-0 fw-medium">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <img src={NutritionLabel} className="img-fluid" alt="Nutrition Label" />
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR FEATURES SECTION */}
      <section id="quick-access" className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Popular Features</h2>
          </div>
          <div className="row g-4 justify-content-center px-md-5">
            {features.map((feature, idx) => (
              <div key={idx} className="col-md-4 px-3">
                <div className="card shadow-sm text-center p-4 h-100 d-flex flex-column" id="pop">
                  {images[feature.image] ? (
                    <img
                      src={images[feature.image]?.default}
                      alt={feature.title}
                      className="card-img-top-logo mx-auto d-block"
                    />
                  ) : (
                    <p className="text-danger">Image not found</p>
                  )}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fs-4">{feature.title}</h5>
                      <p className="card-text fs-5">{feature.description}</p>
                      <br/>
                    </div>

                    <Link to={featureLinks[feature.title] || "/"} className="btn btn-primary w-100 py-3 px-4 fs-5 mt-auto">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import FoodSearch from "./components/FoodSearch";
import PopularRecipes from "./components/PopularRecipes";
import PopularRestaurants from "./components/PopularRestaurants";
import Authors from "./components/Authors";
import RecipeAI from "./components/RecipeAI";
import LoginPage from "./components/LoginPage";

//Router used for navigating between different pages in the app
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-search" element={<FoodSearch />} />
        <Route path="/popular-recipes" element={<PopularRecipes />} />
        <Route path="/popular-restaurants" element={<PopularRestaurants />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/recipe-ai" element={<RecipeAI />} />
        <Route path="/developer-login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

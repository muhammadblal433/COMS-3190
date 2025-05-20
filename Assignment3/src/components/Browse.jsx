import React, { useState } from 'react';
import { Courses } from '../data/Courses';
import Navbar from './Navbar';

const Browse = ({ cart, setCart, setStep }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showPopup = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const addToCart = (course) => {
    if (!cart.find(c => c.offering_id === course.offering_id)) {
      //default quantity to 1
      setCart([...cart, { ...course, quantity: 1 }]); 
      showPopup("✅ Item added to cart!");
    } else {
      showPopup("⚠️ Already added to cart");
    }
  };
  
  //two const for filter and search
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDifficulty, setSelectedDifficulty] = useState(0); // move this up

  // Filter courses based on search query and difficulty level
  const filteredCourses = Courses.filter(course =>
    (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     course.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedDifficulty === 0 || course.difficulty === selectedDifficulty)
  );
  

  return (
    <>
      <Navbar
        setStep={setStep}
        step="browse"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />


      {showToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.offering_id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-black">{course.title}</h3>
                <p className="text-sm black">
                  {course.id} | Instructor: {course.instructor}
                </p>
              </div>
              <p className="text-black text-sm mb-2">{course.description}</p>
              <p className="font-bold text-lg text-black">${Number(course.price).toFixed(2)}</p>
              <p className="text-yellow-500 text-sm">⭐ {course.rating}</p>

              {/* Difficulty level placeholder (use actual property when available) */}
              {course.difficulty && (
                <p className="text-bold text-black mt-1">
                  Difficulty: Level {course.difficulty}
                </p>
              )}

              <button
                className="mt-3 bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded w-full"
                onClick={() => addToCart(course)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browse;

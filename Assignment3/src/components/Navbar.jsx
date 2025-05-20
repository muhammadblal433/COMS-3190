import React from 'react';

//Navbar component
const Navbar = ({
  setStep,
  step,
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty
}) => {

  return (
    <nav className="bg-stone-400 text-white px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-md sticky top-0 z-50">

      {/* Title and Button */}
      <div className="flex justify-center lg:justify-start w-full lg:w-auto">
        <button
          onClick={() => setStep("browse")}
          className="text-2xl font-bold hover:text-green-900 transition cursor-pointer"
        >
          Course Catalog
        </button>
      </div>

      {/* Center: Search Bar (Only on Browse Page) */}
      {step === "browse" && (
        <div className="w-full lg:w-1/2 mx-auto flex flex-col sm:flex-row gap-3 items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-stone-600 rounded-lg px-4 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-900 bg-stone-500"
          />

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
            className="border border-stone-600 bg-stone-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-900"
          >
            <option value={0}>All Levels</option>
            <option value={1}>1 - Beginner</option>
            <option value={2}>2</option>
            <option value={3}>3 - Intermediate</option>
            <option value={4}>4</option>
            <option value={5}>5 - Expert</option>
          </select>
        </div>
      )}


      {/* Right: Navigation Buttons */}
      <div className="flex justify-center lg:justify-end gap-4 w-full lg:w-auto">
        {/* first button for back to browse*/}
        <button
          onClick={() => setStep("browse")}
          className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer"
        >
          Browse Courses
        </button>
        {/* Second button for cart*/}
        <button
          onClick={() => setStep("cart")}
          className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer"
        >
          Go to Cart
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

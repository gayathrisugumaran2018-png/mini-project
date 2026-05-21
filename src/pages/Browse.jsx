import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaMicrophone } from "react-icons/fa";

function Browse() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const startVoiceSearch = () => {

  const recognition =
    new window.webkitSpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = (event) => {

    const voiceText =
      event.results[0][0].transcript;

    setSearch(voiceText);
  };
};
const [selectedCategory, setSelectedCategory] =
  useState("All");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await API.get("/recipes");

      setRecipes(response.data);

      console.log("Browse Recipes:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {

  const matchSearch =
    recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchCategory =
    selectedCategory === "All"
      ? true
      : recipe.category === selectedCategory;

  return matchSearch && matchCategory;
});
  const categories = [
  "All",
  "Italian",
  "Thai",
  "Mediterranean",
  "Japanese",
  "Dessert",
  "Breakfast",
  "Mexican",
  "Indian",
  "American",
];

  return (
    <div className="min-h-screen bg-orange-50 px-4 sm:px-6 py-10">
         <Navbar />

      {/* TITLE */}

      <h1 className="text-4xl sm:text-5xl font-bold text-center text-orange-500 mb-10 mt-2">
        Browse Recipes 🍕
      </h1>

      {/* SEARCH */}

      <div className="max-w-2xl mx-auto mb-12 relative">

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-4 px-5 rounded-2xl outline-none border-2 border-orange-200 focus:border-orange-500 shadow-md"
        />
                <button
  onClick={startVoiceSearch}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 text-2xl hover:scale-110 duration-300"
>
  <FaMicrophone />
</button>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-[30px] p-8 shadow-md mb-14">

  <h2 className="text-xl font-bold text-[#2d1405] mb-6">
    Category
  </h2>

  <div className="flex flex-wrap gap-4">

    {categories.map((category) => (

      <button
        key={category}
        onClick={() =>
          setSelectedCategory(category)
        }
        className={`px-6 py-3 rounded-2xl border duration-300 font-medium ${
          selectedCategory === category
            ? "bg-orange-500 text-white border-orange-500 shadow-lg"
            : "bg-white text-[#2d1405] border-orange-200 hover:bg-orange-50"
        }`}
      >
        {category}
      </button>

    ))}
  </div>
</div>

      {/* CARDS */}

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden group">

              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover group-hover:scale-110 duration-500"
              />

              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                {recipe.category}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-xl text-sm">
                ⏱ {recipe.cookTime} mins
              </div>
            </div>

            {/* CONTENT */}

            <div className="p-6">

              <h2 className="text-2xl font-bold text-[#2d1405] mb-3">
                {recipe.title}
              </h2>

              <p className="text-gray-600 leading-7 mb-5">
                {recipe.description}
              </p>

              <div className="flex justify-between items-center mb-5">

                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold">
                  {recipe.difficulty}
                </span>

                <span className="text-yellow-500">
                  ★★★★☆
                </span>
              </div>

              <Link
                to={`/recipe/${recipe.id}`}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold duration-300"
              >
                View Full Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
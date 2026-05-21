import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import foodImage from "../assets/burger.png";

import {
  FaBars,
  FaTimes,
  FaHeart,
  FaUtensils,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // FETCH RECIPES
  useEffect(() => {
    fetchRecipes();

    // LOAD FAVORITES
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(storedFavorites);
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await API.get("/recipes");

      setRecipes(response.data);

      console.log("Recipes:", response.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  // FAVORITE LOGIC
  const toggleFavorite = (recipe) => {
    const exists = favorites.find(
      (item) => item.id === recipe.id
    );

    let updatedFavorites = [];

    if (exists) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== recipe.id
      );
    } else {
      updatedFavorites = [...favorites, recipe];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // FILTER + SEARCH
  const filteredRecipes = recipes.filter((recipe) => {
    const matchCategory =
      selectedCategory === "All"
        ? true
        : recipe.category === selectedCategory;

    const matchSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-orange-50 overflow-x-hidden">
      {/* NAVBAR */}

      <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">
            RecipeShare 🍔
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/home"
              className="font-semibold hover:text-orange-500 duration-300"
            >
              Home
            </Link>

            <Link
              to="/browse"
              className="font-semibold hover:text-orange-500 duration-300"
            >
              Browse
            </Link>

            <Link
              to="/favorites"
              className="font-semibold hover:text-orange-500 duration-300"
            >
              Favorites
            </Link>

            <Link
              to="/add"
              className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 duration-300 flex items-center gap-2"
            >
              <FaPlus />
              Add Recipe
            </Link>

            <Link
              to="/"
              className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-500 hover:text-white duration-300"
            >
              Logout
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-3xl text-orange-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden bg-white overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-96 py-4" : "max-h-0"
            }`}
        >
          <div className="flex flex-col items-center gap-5">
            <Link to="/home">Home</Link>

            <Link to="/browse">Browse</Link>

            <Link to="/favorites">Favorites</Link>

            <Link
              to="/add"
              className="bg-orange-500 text-white px-5 py-2 rounded-xl flex items-center gap-2"
            >
              <FaPlus />
              Add Recipe
            </Link>
            <Link to="/profile">

              <img
                src="https://i.pinimg.com/736x/44/5d/87/445d87f5271b9df840b88ea921d7d9a0.jpg"
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 hover:scale-110 duration-300"
              />

            </Link>

            <Link
              to="/"
              className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* SEARCH BAR */}

      {/* <div className="pt-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Search delicious recipes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full py-4 pl-14 pr-5 rounded-full outline-none text-lg shadow-lg border-2 border-transparent focus:border-orange-400"
          />

          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 text-xl" />
        </div>
      </div> */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-4 px-5 rounded-2xl outline-none border-2 border-orange-200 focus:border-orange-500 shadow-md"
        />
      </div>

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10 px-4 sm:px-6 py-16">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Share Your
            <span className="text-orange-500">
              {" "}
              Favorite Recipes
            </span>
          </h1>

          <p className="text-gray-600 text-lg leading-8 mb-8">
            Discover delicious recipes from food lovers around the world.
            Cook, share, and save your favorite dishes easily.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/browse" className="bg-orange-500 text-white px-8 py-4 rounded-2xl hover:bg-orange-600 duration-300 shadow-lg">
              Explore Recipes
            </Link>

            <Link
              to="/add"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-2xl hover:bg-orange-500 hover:text-white duration-300"
            >
              Add Your Recipe
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={foodImage}
            alt="food"
            className="w-full max-w-md animate-bounce"
          />
        </div>
      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 py-10">

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-3 duration-300">
          <FaUtensils className="text-5xl text-orange-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-3">
            Easy Cooking
          </h2>

          <p className="text-gray-600">
            Simple and tasty recipes for everyday cooking.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-3 duration-300">
          <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-3">
            Favorite Recipes
          </h2>

          <p className="text-gray-600">
            Save your most loved dishes in one place.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-3 duration-300">
          <FaPlus className="text-5xl text-green-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-3">
            Share Recipes
          </h2>

          <p className="text-gray-600">
            Upload and share your recipes with everyone.
          </p>
        </div>
      </section>

      {/* CATEGORY */}

      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 px-4 sm:px-6 py-10">
        {[
          "All",
          "Indian",
          "Italian",
          "Dessert",
          "Fast Food",
        ].map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-6 py-3 rounded-2xl font-semibold duration-300 ${selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* RECIPES */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <h1 className="text-4xl sm:text-5xl font-bold text-center text-orange-500 mb-16">
          Featured Recipes 🔥
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl duration-300"
            >
              {/* IMAGE */}
              <div className="relative group overflow-hidden">

                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-60 object-cover group-hover:scale-110 duration-500"
                />

                {/* CATEGORY */}
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                  {recipe.category}
                </div>

                {/* FAVORITE */}
                <button
                  onClick={() =>
                    toggleFavorite(recipe)
                  }
                  className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center duration-300 ${favorites.find(
                    (item) =>
                      item.id === recipe.id
                  )
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700"
                    }`}
                >
                  ❤️
                </button>

                {/* DIFFICULTY */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-xl text-sm">
                  {recipe.difficulty}
                </div>
              </div>

              {/* CONTENT */}
              {/* <div className="p-5">
                
                <h2 className="text-2xl font-bold text-[#2d1405] mb-2">
                  {recipe.title}
                </h2> */}
              <div className="p-5 flex flex-col flex-grow">

                <h2 className="text-2xl font-bold text-[#2d1405] mb-2 truncate">
                  {recipe.title}
                </h2>

                <p className="text-gray-500 text-sm mb-3">
                  👨‍🍳 Chef{" "}
                  {recipe.chef || "Gayathri"}
                </p>

                <p className="text-gray-600 text-sm leading-6 mb-4">
                  {recipe.description}
                </p>

                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">
                      ★★★★☆
                    </span>

                    <span className="ml-2 text-sm text-gray-600">
                      4.0
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    ⏱ {recipe.cookTime} mins
                  </span>
                </div>

                {/* <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold duration-300">
                  View Recipe
                </button> */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="block text-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold duration-300"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-[#de8958] rounded-[30px] py-20 px-6 text-center shadow-lg">

          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Share Your Recipe?
          </h1>

          <p className="text-white text-lg sm:text-2xl mb-10">
            Join thousands of home cooks sharing favorite dishes.
          </p>

          <Link
            to="/add" className="bg-white text-[#d97750] px-10 py-4 rounded-2xl text-lg font-semibold hover:scale-105 duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#f7f5f2] border-t border-gray-200 mt-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-[#d97750] w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl">
                🍳
              </div>

              <h1 className="text-3xl font-bold text-[#2d1405]">
                RecipeShare
              </h1>
            </div>

            <p className="text-gray-600 leading-8">
              Share your culinary creations with food lovers around the world.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Explore
            </h2>

            <div className="flex flex-col gap-4 text-gray-600">
              <a href="#">Browse Recipes</a>
              <a href="#">Submit Recipe</a>
              <a href="#">My Favorites</a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Company
            </h2>

            <div className="flex flex-col gap-4 text-gray-600">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Follow Us
            </h2>

            <div className="flex gap-4 flex-wrap">
              <div className="bg-[#f8dcc0] hover:bg-[#d97750] hover:text-white duration-300 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer text-xl">
                📘
              </div>

              <div className="bg-[#f8dcc0] hover:bg-[#d97750] hover:text-white duration-300 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer text-xl">
                📸
              </div>

              <div className="bg-[#f8dcc0] hover:bg-[#d97750] hover:text-white duration-300 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer text-xl">
                🐦
              </div>

              <div className="bg-[#f8dcc0] hover:bg-[#d97750] hover:text-white duration-300 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer text-xl">
                ▶️
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="border-t border-gray-300 text-center py-6">
          <p className="text-gray-500">
            © 2026 RecipeShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
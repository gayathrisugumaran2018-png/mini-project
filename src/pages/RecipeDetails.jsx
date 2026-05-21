import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {

      const response = await API.get(`/recipes/${id}`);

      setRecipe(response.data);

      console.log("Recipe Details:", response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4 sm:px-6">
         <Navbar />

      <div className="max-w-6xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-2xl">

        {/* IMAGE */}

        <div className="relative">

          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="absolute top-6 left-6 bg-orange-500 text-white px-5 py-2 rounded-full">
            {recipe.category}
          </div>

          <div className="absolute top-6 right-6 bg-black/70 text-white px-5 py-2 rounded-full">
            ⏱ {recipe.cookTime} mins
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-8 sm:p-12">

          <h1 className="text-4xl sm:text-5xl font-bold text-[#2d1405] mb-5">
            {recipe.title}
          </h1>

          <p className="text-gray-600 text-lg leading-8 mb-8">
            {recipe.description}
          </p>

          {/* CHEF */}

          <div className="flex flex-wrap gap-5 mb-10">

            <div className="bg-orange-100 px-6 py-3 rounded-2xl">
              👨‍🍳 Chef: {recipe.chef}
            </div>

            <div className="bg-green-100 px-6 py-3 rounded-2xl">
              🔥 Difficulty: {recipe.difficulty}
            </div>

            <div className="bg-yellow-100 px-6 py-3 rounded-2xl">
              ⭐ Rating: 4.5
            </div>
          </div>

          {/* INGREDIENTS */}

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-orange-500 mb-5">
              Ingredients 🥗
            </h2>

            <ul className="grid sm:grid-cols-2 gap-4">

              {recipe.ingredients?.map((item, index) => (
                <li
                  key={index}
                  className="bg-orange-50 p-4 rounded-2xl"
                >
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* STEPS */}

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-orange-500 mb-5">
              Cooking Steps 👨‍🍳
            </h2>

            <div className="space-y-5">

              {recipe.steps?.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-l-4 border-orange-500 p-5 rounded-2xl"
                >
                  <span className="font-bold text-orange-500">
                    Step {index + 1}:
                  </span>{" "}
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}

          <Link
            to="/browse"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold duration-300"
          >
            ← Back To Browse
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
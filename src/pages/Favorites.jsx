import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(storedFavorites);

  }, []);

  return (

    <div className="min-h-screen bg-[#f8f5f2]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold text-[#2d1405] mb-12">
          Favorite Recipes ❤️
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {favorites.map((recipe) => (

            <div
              key={recipe.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-100"
            >

              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold mb-3">
                  {recipe.title}
                </h2>

                <p className="text-gray-500 mb-4">
                  👨‍🍳 Chef {recipe.chef}
                </p>

                <button className="w-full bg-orange-500 text-white py-3 rounded-2xl">
                  View Recipe
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Favorites;
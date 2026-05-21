// import React, { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// function AddRecipe() {
//       const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   const addRecipe = async (e) => {

//     e.preventDefault();

//     const recipe = {
//       title,
//       description,
//       image,
//     };

//     console.log(recipe);

//     try {

//       await API.post("/recipes", recipe);

//       alert("Recipe Added Successfully");

//       navigate("/home");

//     } catch (error) {

//       console.log(error);
//     }
//   };
//   return (

//     <div className="min-h-screen bg-orange-50">

//       <Navbar />

//       <div className="flex justify-center items-center py-10">

//         <form
//           onSubmit={addRecipe}
//           className="bg-white w-96 p-8 rounded-2xl shadow-2xl"
//         >

//           <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
//             Add Recipe
//           </h1>

//           <input
//             type="text"
//             placeholder="Recipe Title"
//                         className="w-full border p-3 rounded-lg mb-4"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <textarea
//             placeholder="Recipe Description"
//             className="w-full border p-3 rounded-lg mb-4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//            <input
//             type="text"
//             placeholder="Image URL"
//             className="w-full border p-3 rounded-lg mb-4"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white p-4 rounded-lg"
//           ></button>
//           </form>

//       </div>

//     </div>
//   );
// }

// export default AddRecipe;
import React, { useState } from "react";
import {
  CirclePlus,
  ImagePlus,
} from "lucide-react";

import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddRecipe() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Italian");
  const [difficulty, setDifficulty] = useState("Medium");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState("");

  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  // ================= INGREDIENTS =================

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  // ================= INSTRUCTIONS =================

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  // ================= SUBMIT =================

  const addRecipe = async (e) => {

    e.preventDefault();

    const recipe = {
      title,
      description,
      image,
      category,
      difficulty,
      cookTime,
      servings,
      tags,
      ingredients,
      instructions,
    };

    console.log(recipe);

    try {

      await API.post("/recipes", recipe);

      alert("Recipe Added Successfully");

      navigate("/home");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-[#f8f5f2]">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#2d1405] mb-4">
          Share Your Recipe
        </h1>

        <p className="text-xl text-[#9c6c4f] mb-12">
          Fill out the form below to share your culinary creation
          with the community
        </p>

        {/* FORM */}
        <form onSubmit={addRecipe}>

          {/* ================= BASIC INFO ================= */}

          <div className="bg-white border border-orange-100 rounded-3xl p-8 mb-10 shadow-sm">

            <h2 className="text-3xl font-bold mb-8 text-[#2d1405]">
              Basic Information
            </h2>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">
                Recipe Title *
              </label>

              <input
                type="text"
                placeholder="e.g., Classic Margherita Pizza"
                className="w-full border border-orange-100 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">
                Description *
              </label>

              <textarea
                rows="5"
                placeholder="Describe your recipe..."
                className="w-full border border-orange-100 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Image */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3">
                Image URL
              </label>

              <div className="flex gap-4">

                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 border border-orange-50 rounded-1xl p-2 outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <button
                  type="button"
                  className="bg-[#f8dcc0] w-16 h-16 rounded-2xl flex items-center justify-center"
                >
                  <ImagePlus className="text-[#2d1405]" />
                </button>

              </div>
            </div>

            {/* Category + Difficulty */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-lg font-semibold mb-3">
                  Category *
                </label>

                <select
                  className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Italian</option>
                  <option>Indian</option>
                  <option>Chinese</option>
                  <option>Dessert</option>
                  <option>Fast Food</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">
                  Difficulty *
                </label>

                <select
                  className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            {/* Cook Time + Servings */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-lg font-semibold mb-3">
                  Cook Time (minutes) *
                </label>

                <input
                  type="number"
                  placeholder="30"
                  className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">
                  Servings *
                </label>

                <input
                  type="number"
                  placeholder="4"
                  className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-lg font-semibold mb-3">
                Tags (comma separated)
              </label>

              <input
                type="text"
                placeholder="e.g., vegetarian, quick, healthy"
                className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

          </div>

          {/* ================= INGREDIENTS ================= */}

          <div className="bg-white border border-orange-100 rounded-3xl p-8 mb-10 shadow-sm">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-[#2d1405]">
                Ingredients
              </h2>

              <button
                type="button"
                onClick={addIngredient}
                className="bg-[#d97750] hover:bg-[#c8653e] text-white px-6 py-3 rounded-2xl flex items-center gap-2 duration-300"
              >
                <CirclePlus size={20} />
                Add
              </button>
            </div>

            {ingredients.map((ingredient, index) => (

              <input
                key={index}
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                className="w-full border border-orange-100 rounded-2xl p-5 outline-none text-lg mb-4"
                value={ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, e.target.value)
                }
              />

            ))}
          </div>

          {/* ================= INSTRUCTIONS ================= */}

          <div className="bg-white border border-orange-100 rounded-3xl p-8 mb-10 shadow-sm">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-[#2d1405]">
                Instructions
              </h2>

              <button
                type="button"
                onClick={addInstruction}
                className="bg-[#d97750] hover:bg-[#c8653e] text-white px-6 py-3 rounded-2xl flex items-center gap-2 duration-300"
              >
                <CirclePlus size={20} />
                Add
              </button>
            </div>

            {instructions.map((instruction, index) => (

              <div key={index} className="flex items-center gap-4 mb-5">

                <div className="bg-[#d97750] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <input
                  type="text"
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 border border-orange-100 rounded-2xl p-5 outline-none text-lg"
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                />
              </div>

            ))}
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="grid md:grid-cols-2 gap-6 pb-10">

            <button
              type="button"
              className="border border-orange-100 bg-white py-5 rounded-2xl text-xl font-semibold hover:bg-gray-50 duration-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#d97750] hover:bg-[#c8653e] text-white py-5 rounded-2xl text-xl font-semibold duration-300 shadow-lg"
            >
              Publish Recipe
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
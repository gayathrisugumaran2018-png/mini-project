// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const logout = () => {

//     localStorage.removeItem("user");

//     alert("Logout Successful");

//     navigate("/");
//   };

//   return (

//     <div className="">

//       {/* <h1 className="text-2xl font-bold">
//         Recipe App
//       </h1>
//       <button
//         onClick={addrecipe}
//         className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
//       >
//         Add recipe
//       </button>
//  */}

//       <button
//         onClick={logout}
//         className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer"
//       >
//         Logout
//       </button>

//     </div>
//   );
// }

// export default Navbar;
import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const logoutUser = () => {

    localStorage.removeItem("User");

    alert("Logout Successful");

    navigate("/");
  };

  return (

    <nav className="bg-white shadow-lg px-8 py-4 flex justify-between items- sticky top-0 z-50">

      {/* LOGO */}

      <div>

        <h1 className="text-3xl font-bold text-orange-500">
          RecipeHub 🍔
        </h1>

      </div>

      {/* NAVIGATION LINKS */}

      <div className="flex gap-8 items-center">

        {/* HOME */}

        <Link
          to="/home"
          className="text-gray-700 font-semibold hover:text-orange-500 duration-300"
        >
          Home
        </Link>

        {/* BROWSE */}

        <Link
          to="/browse"
          className="text-gray-700 font-semibold hover:text-orange-500 duration-300"
        >
          Browse
        </Link>

        {/* FAVORITES */}

        <Link
          to="/favorites"
          className="text-gray-700 font-semibold hover:text-orange-500 duration-300"
        >
          Favorites ❤️
        </Link>

        {/* ADD RECIPE */}

        {/* <Link
          to="/add"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 duration-300"
        >
          + Add Recipe
        </Link> */}

        {/* LOGOUT */}
        <Link to="/profile">

  <img
    src="https://i.pinimg.com/736x/b6/2e/9e/b62e9e6d13e2e757a20bb59111732b8d.jpg"
    alt="profile"
    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 hover:scale-110 duration-300"
  />

</Link>

        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 duration-300"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
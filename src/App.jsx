import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddRecipe from "./components/Addrecipe";
import Favorites from "./pages/Favorites";
import Browse from "./pages/Browse";
import RecipeDetails from "./pages/RecipeDetails";
import Profile from "./pages/Profile";





function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={<Home />}
        />
        <Route
        path="/favorites"
        element={<Favorites/>}
        />
        
          
        <Route
          path="/add"
          element={<AddRecipe />}
        />
         <Route path="/browse" element={<Browse />} />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />
        <Route path="/profile" element={<Profile />} />
  

       

      </Routes>

    </BrowserRouter>
  );
}

export default App;
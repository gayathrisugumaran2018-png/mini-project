import React, { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const loginUser = async (e) => {

    e.preventDefault();

    console.log("========== LOGIN START ==========");

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    try {

      // GET ALL USERS
      const response = await API.get("/users");

      console.log("Users From DB:", response.data);

      // CHECK USER
      const validUser = response.data.find(
        (user) =>
          user.email.trim().toLowerCase() ===
            email.trim().toLowerCase() &&
          user.password.trim() ===
            password.trim()
      );

      console.log("Matched User:", validUser);

      // IF USER EXISTS
      if (validUser) {

        // STORE USER
        localStorage.setItem(
          "User",
          JSON.stringify(validUser)
        );

        console.log(
          "User Stored In LocalStorage"
        );

        alert("Login Successful ✅");

        // NAVIGATE HOME
        navigate("/home");

        localStorage.setItem(
  "User",
  JSON.stringify(user)
);

      } else {

        console.log("Invalid Credentials");

        alert("Invalid Email or Password ❌");
      }

    } catch (error) {

      console.log("Server Error:", error);

      alert("Server Error ❌");
    }

    console.log("========== LOGIN END ==========");
  };

  return (

    <div className="h-screen flex justify-center items-center bg-[url('https://i.pinimg.com/736x/4c/4c/10/4c4c107c7d98edc0d036534f4c652de5.jpg')] bg-cover bg-center">

      <form
        onSubmit={loginUser}
        className="bg-white w-96 p-8 rounded-2xl shadow-2xl"
      >

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
          Welcome
        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:border-orange-500"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:border-orange-500"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 duration-300"
        >
          Login
        </button>

        {/* REGISTER LINK */}

        <p className="text-center mt-4">

          No Account?

          <Link
            to="/register"
            className="text-blue-500 ml-2 font-semibold"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;
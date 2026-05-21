import React, { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {

    e.preventDefault();

    // Avatar Create
    const avatar = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    // Date
    const joinedDate =
      new Date().toISOString().split("T")[0];

    // User Object
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar,
      joinedDate,
    };

    console.log("Sending User:", user);

    try {

      // Check Existing User
      const checkUser = await API.get(
        `/users?email=${email}`
      );

      console.log("Existing User:", checkUser.data);

      if (checkUser.data.length > 0) {

        alert("Email Already Registered");

        return;
      }

      // Add User
      const response = await API.post(
        "/users",
        user
      );

      console.log("Registered:", response.data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="h-screen flex justify-center items-center bg-[url('https://i.pinimg.com/736x/15/1a/a7/151aa75dfbb21a2d186ed954100a3fd0.jpg')] bg-cover ">

      <form
        onSubmit={registerUser}
        className="bg-white w-96 p-8 rounded-2xl shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
          Register
        </h1>

        {/* NAME */}

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
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
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
        >
          Register
        </button>

        <p className="text-center mt-4">

          Already Have Account?

          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;
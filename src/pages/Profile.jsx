import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaHeart,
  FaUtensils,
  FaStar,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEdit,
} from "react-icons/fa";

function Profile() {

  const user =
    JSON.parse(localStorage.getItem("User"));

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      <Navbar />

      <div className="max-w-6xl mx-auto pt-28 px-4 sm:px-6 pb-16">

        {/* MAIN CARD */}

        <div className="bg-white/80 backdrop-blur-lg rounded-[40px] overflow-hidden shadow-2xl border border-white">

          {/* COVER IMAGE */}

          <div className="relative h-72">

            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070"
              alt="cover"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            {/* PROFILE IMAGE */}

            <div className="absolute left-1/2 -bottom-20 -translate-x-1/2">

              <div className="relative">

                <img
                  src="https://i.pinimg.com/1200x/01/85/e4/0185e4c0175af1347a02a9a814ede0e2.jpg"
                  alt="profile"
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl hover:scale-105 duration-300"
                />

                <button className="absolute bottom-2 right-2 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 duration-300">

                  <FaEdit />

                </button>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="pt-28 px-6 sm:px-12 pb-14 text-center">

            {/* NAME */}

            <h1 className="text-5xl font-bold text-[#2d1405] mb-3">
              {user?.name || "Gayathri"}
            </h1>

            <p className="text-lg text-gray-500 mb-2">
              Frontend Developer & Food Blogger 👩‍🍳
            </p>

            <p className="text-orange-500 font-semibold mb-8">
              {user?.email || "gayathri@gmail.com"}
            </p>

            {/* SOCIAL ICONS */}

            <div className="flex justify-center gap-5 mb-12">

              <div className="bg-pink-100 text-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 duration-300 cursor-pointer">
                <FaInstagram />
              </div>

              <div className="bg-gray-200 text-black w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 duration-300 cursor-pointer">
                <FaGithub />
              </div>

              <div className="bg-blue-100 text-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 duration-300 cursor-pointer">
                <FaLinkedin />
              </div>

            </div>

            {/* STATS */}

            <div className="grid sm:grid-cols-3 gap-8 mb-14">

              <div className="bg-orange-50 rounded-3xl p-8 hover:-translate-y-2 duration-300 shadow-md">

                <FaUtensils className="text-5xl text-orange-500 mx-auto mb-4" />

                <h2 className="text-4xl font-bold text-[#2d1405] mb-2">
                  25
                </h2>

                <p className="text-gray-600 font-semibold">
                  Recipes Shared
                </p>
              </div>

              <div className="bg-red-50 rounded-3xl p-8 hover:-translate-y-2 duration-300 shadow-md">

                <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />

                <h2 className="text-4xl font-bold text-[#2d1405] mb-2">
                  10
                </h2>

                <p className="text-gray-600 font-semibold">
                  Favorites
                </p>
              </div>

              <div className="bg-yellow-50 rounded-3xl p-8 hover:-translate-y-2 duration-300 shadow-md">

                <FaStar className="text-5xl text-yellow-500 mx-auto mb-4" />

                <h2 className="text-4xl font-bold text-[#2d1405] mb-2">
                  4.9
                </h2>

                <p className="text-gray-600 font-semibold">
                  Ratings
                </p>
              </div>
            </div>

            {/* ABOUT */}

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-[30px] p-10 mb-12 text-left shadow-inner">

              <h2 className="text-3xl font-bold text-orange-500 mb-6">
                About Me 👨‍🍳
              </h2>

              <p className="text-gray-700 leading-9 text-lg">
                Passionate frontend developer and food lover
                who enjoys creating beautiful web applications
                and sharing delicious recipes with people around
                the world. I love exploring UI/UX design,
                React development, and modern web technologies.
              </p>
            </div>

            {/* SKILLS */}

            <div className="mb-14">

              <h2 className="text-3xl font-bold text-[#2d1405] mb-8">
                Skills 🚀
              </h2>

              <div className="flex flex-wrap justify-center gap-4">

                {[
                  "React JS",
                  "Tailwind CSS",
                  "JavaScript",
                  "HTML",
                  "CSS",
                  "JSON Server",
                  "Axios",
                  "Frontend UI",
                ].map((skill) => (

                  <div
                    key={skill}
                    className="bg-white border border-orange-200 px-6 py-3 rounded-2xl shadow-sm hover:bg-orange-500 hover:text-white duration-300 font-semibold"
                  >
                    {skill}
                  </div>

                ))}
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap justify-center gap-6">

              <Link
                to="/favorites"
                className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 duration-300"
              >
                View Favorites
              </Link>

              <Link
                to="/add"
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 duration-300"
              >
                Add Recipe
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
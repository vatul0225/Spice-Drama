import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

function AuthPage({ setShowAuth }) {
  const [isSignup, setIsSignup] = useState(true);
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Login / Register submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let apiUrl = url;
      apiUrl += isSignup ? "/api/user/register" : "/api/user/login";

      const response = await axios.post(apiUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowAuth(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAuth(false)}
    >
      {/* Sliding Panel */}
      <motion.div
        className="w-full sm:max-w-md h-full bg-white shadow-xl p-8 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isSignup ? "New User Registration" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignup && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="User Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className="w-full border px-4 py-3 rounded-xl"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            className="w-full border px-4 py-3 rounded-xl"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 text-white py-3 rounded-xl"
          >
            {isSignup ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isSignup ? "Already registered?" : "New user?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-orange-500 cursor-pointer font-medium ml-1"
          >
            {isSignup ? "Login here" : "Register here"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;

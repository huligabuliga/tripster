import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegEnvelope, FaKey } from "react-icons/fa";
import axios from "axios";
import newRequest from "../utils/newRequest";
import useAuth from "../hooks/useAuth";
import "../cftools.css";

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Store
      setAuth({ id: res.data._id, user: email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      // Navigate to homepage or previous route (any other page user tried to access but was unauthenticated)
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="justify-center cfbg_01 h-screen w-full flex items-center">
      <div className="flex flex-col justify-center  max-w-[400px] w-full px-2 py-3 mx-auto text-center bg-slate-50 rounded-lg shadow-lg shadow-gray-400">
        <img src="/coinfusionLogoGreen.jpg" alt="Coinfusion Logo"></img>
        <h2 className="text-3xl font-bold mb-2">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-2">
            <div className="bg-gray-100 flex items-center w-64 p-2">
              <FaRegEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-gray-100 outline-none flex-1 cursor-pointer"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-100 flex items-center w-64 p-2">
              <FaKey className="mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-gray-100 outline-none flex-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer !important"
            type="submit"
          >
            Log In
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-green-600">
            Register!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

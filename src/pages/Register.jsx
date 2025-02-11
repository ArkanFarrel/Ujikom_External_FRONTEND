import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import rumah from "../img/rumah.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Semua field harus diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3008/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      console.error(
        "Registrasi gagal:",
        error.response?.data?.msg || error.message
      );
      alert("Registrasi gagal! Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={rumah} alt="Rumah" />
      </div>

      <div className="bg-orange-600 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={handleRegister}
        >
          <h2 className="text-4xl text-white font-bold text-center">SIGN UP</h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Nama</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm py-2">
            <label className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </label>
            <Link to="/login" className="text-blue-500 hover:underline">
              I have an account? Sign In
            </Link>
          </div>

          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

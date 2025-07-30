/*"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

const LottiePlayer = dynamic(() => import("@/app/components/LottiePlayer"), {
  ssr: false,
});

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password)) {
      return setError("Password must be at least 6 characters and include an uppercase letter, a number, and a special character.");
    }

    try {
      let imageUrl = "";
      if (photoFile) {
        imageUrl = await uploadToImgbb(photoFile);
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user",
        photo: imageUrl,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post("/api/register", newUser);
      if (response.data.success) {
        router.push("/login");
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-white p-6">
          <LottiePlayer />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full p-8 flex flex-col justify-center bg-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full mb-4"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full mb-4"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full mb-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input input-bordered w-full mb-4"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="file-input file-input-bordered w-full mb-6"
          />

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;*/
import Image from "next/image";

import React from "react";
import Register from "./components/Register";


const RegisterPage = ()=> {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Register</h1>
      <section className="container mx-auto grid grid-cols-12">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <Image
            className="hidden md:block"
            src={"/assets/images/login/login.svg"}
            width={460}
            height={500}
            alt={"Authentication Image"}
          />
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <Register></Register>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;

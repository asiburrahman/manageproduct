"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/app/actions/auth/registerUser";
import { saveUserDataInDB, uploadImage } from "@/app/lib/utility";
import { toast, ToastContainer } from "react-toastify";
// import SocialLogin from "@/app/login/components/SocialLogin";
const Register = () => {

 const [loading, setLoading]= useState(false) 
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    const name = e.target.name.value;
    const email = e.target.mail.value;
    const password = e.target.password.value;
    const imageData = e.target.image.files[0];

    const passwordCheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordCheck.test(password)) {
      return toast.error(
        'Password must contain uppercase, lowercase, digit and be at least 6 characters long.'
      );
    }

    try {
      const photoUrl = await uploadImage(imageData);
      



     const result = await saveUserDataInDB({ name, email, password, image: photoUrl, role: "user" });
    //  console.log(result);
     
     
      if(!result?.insertedId) return toast.error('Something Wrong!!');
      setLoading(false)
      toast.success('Account created successfully!');
    } catch (error) {
      const message = error?.message || 'Registration failed';
      setErrorMessage(message);
      toast.error(message);
    }
  };

  // const handleGoogleSignin = async () => {
  //   try {
  //     const result = await googleSignin();
  //     const user = result.user;
  //     setUser(user);
  //     await saveUserDataInDB({
  //       name: user.displayName,
  //       email: user.email,
  //       image: user.photoURL,
  //     });
  //     toast.success('Logged in with Google!');
  //   } catch (error) {
  //     const msg = error.message || 'Google login failed';
  //     setErrorMessage(msg);
  //     toast.error(msg);
  //   }
  // };

  return (
    <div className=" flex items-center justify-center bg-base-300 px-4">
      <ToastContainer />
      <div className="card w-full max-w-sm  shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              required
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="label">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              required
              type="email"
              name="mail"
              className="input input-bordered w-full"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-4 text-lg"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-full">
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Register'}
          </button>
        </form>

        <div className="divider">OR</div>

        {/* <button
          onClick={handleGoogleSignin}
          className="btn w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <FcGoogle className="text-xl mr-2" />
          Continue with Google
        </button> */}

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {errorMessage && (
          <p className="text-red-600 text-sm font-medium text-center mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
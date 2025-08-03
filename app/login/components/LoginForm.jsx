"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
// import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();
  const emailRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;


    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        // ✅ You can inspect the actual error string
        if (response.error === "Invalid email or password") {
          toast.error("Your email or password is incorrect.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      // console.error(res);
      // console.error(err);
    }
  };

  const handleForget = () => {
    if (!emailRef.current.value) {
      toast.warn("Please enter your email first!");
      return;
    }
    router.push(`/forgetPassword/${emailRef.current.value}`);
  };

  return (
    <div className="flex items-center justify-center bg-base-300 px-4 ">
      <div className="card w-full max-w-sm shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              required
              type="email"
              name="email"
              ref={emailRef}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              required
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForget}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* <SocialLogin /> */}

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

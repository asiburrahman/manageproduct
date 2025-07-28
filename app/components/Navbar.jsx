"use client";

import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaProjectDiagram,
  FaShoppingCart,
  FaBoxes,
  FaBlog,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import Link from "next/link";

const link = (
  <>
    <li>
      <Link href={"/"} className="flex items-center gap-1">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link href={"/products"} className="flex items-center gap-1">
        <FaBoxes /> Product
      </Link>
    </li>
    <li>
      <Link href={"/about"} className="flex items-center gap-1">
        <FaUser /> About
      </Link>
    </li>
    <li>
      <Link href={"/blogs"} className="flex items-center gap-1">
        <FaBlog /> Blogs
      </Link>
    </li>
    <li>
      <Link href={"/my-product"} className="flex items-center gap-1">
        <FaShoppingCart /> My Product
      </Link>
    </li>
  </>
);

const Navbar = () => (
  <div className="sticky top-0 z-50 shadow-xl font-bold text-black bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400">
    <div className="navbar w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="text-sm font-bold md:text-2xl lg:text-3xl">
            <img className="w-12 h-12 rounded-full md:inline-block" src="#" alt="logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end flex gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/register"} className="flex items-center gap-1">
              <FaUserPlus /> Register
            </Link>
          </li>
          <li>
            <Link href={"/login"} className="flex items-center gap-1">
              <FaSignInAlt /> Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Navbar;

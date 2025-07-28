"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <Image
        src="/product.jpg" // Make sure this image exists in /public
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 overlay_bg   bg-opacity-100 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to ProductManage
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Organize, manage, and showcase your products with ease using our modern, feature-rich catalog system.
          </p>
          <Link href={`/products`}>
            <button className="btn btn-accent btn-lg">Browse Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

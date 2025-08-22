// components/AboutContent.tsx (Client Component)
"use client";

import { motion } from "framer-motion";




const AboutContent = () => {
     return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg text-gray-700 leading-relaxed space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <p>
        <span className="font-semibold">ProductManager</span> is a modern web
        application designed to simplify product management for businesses and
        individuals. It provides a seamless way to create, update, and organize
        your product listings with powerful features.
      </p>
      <p>
        Our platform enables users to manage products with essential details
        like pricing, stock, discounts, and ratings — all in one place. With
        image upload support, intuitive UI, and secure authentication, it
        ensures a smooth experience for both administrators and customers.
      </p>
      <p>
        We believe in building user-friendly and scalable applications. That’s
        why ProductManager is developed using the{" "}
        <span className="font-semibold">MERN stack with Next.js</span>, ensuring
        fast rendering, responsive design, and future-ready performance.
      </p>
      <p className="font-semibold text-gray-900">
        Our mission is simple: Empower businesses to manage their products
        effortlessly, while offering customers a delightful browsing experience.
      </p>
    </motion.div>
  );
};

export default AboutContent;
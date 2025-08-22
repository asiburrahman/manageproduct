"use client";
import { useState } from "react";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send data to API or Email service
    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We’ll get back to you soon.",
      icon: "success",
      confirmButtonColor: "#3b82f6",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-11/12  grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Left Side Info */}
        <div className="bg-blue-600 text-white flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 text-blue-100">
            We'd love to hear from you! Whether you have a question about our products,
            services, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <ul className="space-y-4">
            <li><span className="font-semibold">📍 Address:</span> Dhaka, Bangladesh</li>
            <li><span className="font-semibold">📞 Phone:</span> +880 1234-567890</li>
            <li><span className="font-semibold">✉️ Email:</span> support@productmanage.com</li>
          </ul>
        </div>

        {/* Right Side Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="input input-bordered w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="input input-bordered w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="textarea textarea-bordered w-full rounded-xl h-32"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl text-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

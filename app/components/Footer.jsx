"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-10 mt-16 rounded-t-2xl shadow-lg">
      <div className="w-11/12 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">ProductManage</h2>
          <p className="mt-3 text-sm text-gray-200">
            Manage your products smartly with efficiency and speed.  
            We help you organize, track, and scale with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {/* <li><Link href="/about" className="hover:underline">About</Link></li> */}
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/help" className="hover:underline">Help Center</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-200 mb-3">Subscribe to our newsletter</p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="px-3 py-2 w-full text-gray-700 focus:outline-none"
            />
            <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-400 mt-10 pt-5 text-center text-sm text-gray-200">
        <p>© {new Date().getFullYear()} ProductManage. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

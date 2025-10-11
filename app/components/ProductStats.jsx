"use client";
import { useEffect, useState } from "react";

export default function ProductStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
    pendingReviews: 0,
  });

  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/users"),
        ]);

        const products = await productRes.json();
        const users = await userRes.json();

        const uniqueCategories = new Set(products.map((p) => p.category));

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalCategories: uniqueCategories.size,
          pendingReviews: products.filter((p) => p.status === "pending").length,
        });

        setLoading(false); // ✅ Stop loading after data fetched
      } catch (error) {
        console.error("Failed to load stats:", error);
        setLoading(false); // ✅ Stop loading even if error occurs
      }
    };

    fetchStats();
  }, []);

  // ✅ Spinner UI while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Main stats section after data loads
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Platform Overview
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-4xl font-bold text-indigo-700">{stats.totalProducts}</h3>
            <p className="text-gray-600 mt-2">Total Products</p>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-4xl font-bold text-green-700">{stats.totalUsers}</h3>
            <p className="text-gray-600 mt-2">Registered Users</p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-4xl font-bold text-yellow-700">{stats.totalCategories}</h3>
            <p className="text-gray-600 mt-2">Product Categories</p>
          </div>

          <div className="p-6 bg-red-50 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-4xl font-bold text-red-700">{stats.pendingReviews}</h3>
            <p className="text-gray-600 mt-2">Pending Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}

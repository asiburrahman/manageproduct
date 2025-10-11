"use client";
import ProductCard from "@/app/service/componant/ProductCard";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // ✅ Stop loading whether success or fail
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesPrice;
  });

  // ✅ Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-72"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input input-bordered w-full md:w-48"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </section>
  );
};

export default ProductsPage;

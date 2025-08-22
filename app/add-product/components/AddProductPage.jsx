"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddProduct() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form values using FormData
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());

    // Convert numbers & booleans manually
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);
    product.discount = parseFloat(product.discount);
    product.rating = parseFloat(product.rating);
    product.isFeatured = form.get("isFeatured") === "on";

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added.",
        });
        e.target.reset(); // clear form after success
        router.push("/products"); // redirect to products page
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while adding the product.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-300 shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input type="text" name="name" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" required className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input type="number" name="price" step="0.01" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input type="text" name="image" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input type="text" name="category" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input type="number" name="stock" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input type="text" name="brand" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input type="number" name="discount" step="0.01" defaultValue="0" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input type="number" name="rating" step="0.1" defaultValue="0" className="w-full border p-2 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isFeatured" />
          <label>Featured Product</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       // Redirect user if not logged in
//       router.push("/login");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     // Show loading indicator while session is being fetched
//     return <p>Loading...</p>;
//   }

//   if (status === "authenticated") {
//     // Render the form only when user is authenticated
//     return <AddProductForm session={session} />;
//   }

//   return null; // fallback while redirect happens
const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());

    // type conversions
    product.price = parseFloat(product.price) || 0;
    product.stock = parseInt(product.stock) || 0;
    product.discount = parseFloat(product.discount) || 0;
    product.rating = parseFloat(product.rating) || 0;
    product.isFeatured = form.get("isFeatured") === "on";

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.user?.token ? { Authorization: `Bearer ${session.user.token}` } : {}),
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added.",
        });
        e.target.reset();
        router.push("/products");
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-base-300 p-6 rounded-xl shadow">
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
  );


 }

// function AddProductForm({ session }) {
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData(e.target);
//     const product = Object.fromEntries(form.entries());

//     // type conversions
//     product.price = parseFloat(product.price) || 0;
//     product.stock = parseInt(product.stock) || 0;
//     product.discount = parseFloat(product.discount) || 0;
//     product.rating = parseFloat(product.rating) || 0;
//     product.isFeatured = form.get("isFeatured") === "on";

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(session?.user?.token ? { Authorization: `Bearer ${session.user.token}` } : {}),
//         },
//         body: JSON.stringify(product),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Product Added!",
//           text: "Your product has been successfully added.",
//         });
//         e.target.reset();
//         router.push("/products");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: "Something went wrong while adding the product.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.message,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-base-300 p-6 rounded-xl shadow">
//       <div>
//         <label className="block mb-1 font-medium">Product Name</label>
//         <input type="text" name="name" required className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Description</label>
//         <textarea name="description" required className="w-full border p-2 rounded"></textarea>
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Price</label>
//         <input type="number" name="price" step="0.01" required className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Image URL</label>
//         <input type="text" name="image" required className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Category</label>
//         <input type="text" name="category" required className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Stock</label>
//         <input type="number" name="stock" required className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Brand</label>
//         <input type="text" name="brand" className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Discount (%)</label>
//         <input type="number" name="discount" step="0.01" defaultValue="0" className="w-full border p-2 rounded" />
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Rating</label>
//         <input type="number" name="rating" step="0.1" defaultValue="0" className="w-full border p-2 rounded" />
//       </div>

//       <div className="flex items-center gap-2">
//         <input type="checkbox" name="isFeatured" />
//         <label>Featured Product</label>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// }

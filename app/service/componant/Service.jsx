import dbConnect from "@/app/lib/dbConnect";
import Link from "next/link";
import ProductCard from "./ProductCard";

export default async function Service() {
  const productCollection = await dbConnect("products");
  const featuredProducts = await productCollection.find({ isFeatured: true }).limit(4).toArray();

  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={{ ...product, _id: product._id.toString() }} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/products">
          <button className="btn btn-accent px-6">View More Products</button>
        </Link>
      </div>
    </section>
  );
}

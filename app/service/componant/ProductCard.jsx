"use client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const { name, description, price, discount, image, brand, rating, stock } = product;

  const discountedPrice = price - (price * (discount / 100));

  return (
    <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="h-48 relative">
        <Image
          src={image && image.startsWith("http")
          ? product.image
          : "/assets/images/products/1.png"}
          alt={name}
          fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-xl"
        />
      </figure>
      <div className="card-body p-4 text-gray-700">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm">{description.slice(0, 60)}...</p>
        <p className="text-xs text-gray-500">Brand: {brand}</p>
        <p className="text-sm font-semibold">Rating: ⭐ {rating}</p>

        <div className="mt-2 flex justify-between items-center">
          <div>
            {discount > 0 ? (
              <>
                <p className="text-lg font-bold text-green-600">${discountedPrice.toFixed(2)}</p>
                <p className="text-sm line-through text-red-500">${price}</p>
              </>
            ) : (
              <p className="text-lg font-bold">${price}</p>
            )}
          </div>
          <p className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-outline btn-primary"><Link href={`/products/${product._id}`}>View</Link> </button>
          <button className="btn btn-sm btn-accent">Add to Cart</button>
        </div>
      </div>

      
    </div>
  );
};

export default ProductCard;

"use client";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { name, description, price, discount, image, brand, rating, stock } = product;

  const discountedPrice = price - (price * (discount / 100));

  const getValidSrc = (src) => {
    if (!src || typeof src !== 'string') return "/assets/images/products/1.png";
    if (src.startsWith("/")) return src;
    try {
      new URL(src);
      return src;
    } catch {
      return "/assets/images/products/1.png";
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col h-full">
      <figure className="h-56 relative w-full bg-white p-4">
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 badge badge-secondary font-bold shadow-sm">
            {discount}% OFF
          </div>
        )}
        <Image
          src={getValidSrc(image || product.image)}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="badge badge-outline text-xs text-gray-500">{brand}</div>
          <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
            <FaStar /> {rating}
          </div>
        </div>
        
        <h2 className="card-title text-lg font-bold line-clamp-1" title={name}>{name}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow" title={description}>{description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              {discount > 0 ? (
                <div className="flex flex-col">
                  <span className="text-xs line-through text-gray-400">${price.toFixed(2)}</span>
                  <span className="text-xl font-extrabold text-primary">${discountedPrice.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-xl font-extrabold text-base-content">${price.toFixed(2)}</span>
              )}
            </div>
            <p className={`text-xs font-semibold ${stock > 0 ? "text-success" : "text-error"}`}>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link href={`/products/${product._id}`} className="btn btn-outline btn-primary btn-sm w-full">
              <FaEye /> View
            </Link>
            <button className="btn btn-primary btn-sm w-full" disabled={stock <= 0}>
              <FaShoppingCart /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

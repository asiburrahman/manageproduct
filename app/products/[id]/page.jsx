import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import BuyNowButton from "@/app/components/BuyNowButton";
import { FaStar, FaTag, FaBoxOpen, FaCalendarAlt } from "react-icons/fa";

export async function generateMetadata({ params }) {
  return {
    title: `Product Details`,
  };
}

const ProductDetails = async ({ params }) => {
  const {id} = await params
  const collection = await dbConnect("products");
  const product = await collection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return <div className="text-center mt-20 text-2xl font-bold text-gray-500">Product not found.</div>;
  }

  const {
    name,
    description,
    image,
    price,
    discount,
    brand,
    category,
    stock,
    rating,
    createdAt,
  } = product;

  const finalPrice = discount ? price - (price * discount) / 100 : price;

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
    <div className="w-11/12 max-w-6xl mx-auto py-12 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-200">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8">
          
          {/* Image Section */}
          <div className="relative w-full h-[400px] lg:h-[600px] bg-white p-8 border-b lg:border-b-0 lg:border-r border-base-200 flex items-center justify-center group">
            {discount > 0 && (
              <div className="absolute top-6 left-6 z-10 badge badge-secondary badge-lg font-bold shadow-md">
                {discount}% OFF
              </div>
            )}
            <Image
              src={getValidSrc(product.image)}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-primary badge-outline gap-1 p-3 font-semibold"><FaTag /> {brand}</div>
              <div className="badge badge-accent badge-outline gap-1 p-3 font-semibold"><FaBoxOpen /> {category}</div>
              <div className="badge badge-warning gap-1 p-3 font-bold text-white"><FaStar /> {rating} / 5</div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-base-content leading-tight">{name}</h1>
            
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Price & Stock */}
            <div className="bg-base-200 rounded-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-primary">${finalPrice.toFixed(2)}</span>
                  {discount > 0 && (
                    <span className="text-xl line-through text-gray-400 font-semibold mb-1">
                      ${price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="sm:text-right">
                <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Availability</p>
                <span className={`badge badge-lg font-bold p-4 ${stock > 0 ? "badge-success text-white" : "badge-error text-white"}`}>
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto">
              <BuyNowButton inStock={stock > 0} />
            </div>

            {/* Metadata */}
            <div className="mt-8 pt-6 border-t border-base-200 flex items-center text-sm text-gray-400 gap-2">
              <FaCalendarAlt /> 
              <span>Listed on {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { ObjectId } from "mongodb";
import dbConnect from "@/app/lib/dbConnect";
import Image from "next/image";
import BuyNowButton from "@/app/components/BuyNowButton";

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
    return <div className="text-center mt-10">Product not found.</div>;
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

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-80 w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="hight: auto, width: auto"
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="mb-2 ">{description}</p>
          <p className="mb-1">Brand: <strong>{brand}</strong></p>
          <p className="mb-1">Category: <strong>{category}</strong></p>
          <p className="mb-1">Rating: ⭐ {rating} / 5</p>
          <p className="mb-1">
            Stock:{" "}
            <span className={stock > 0 ? "text-green-600" : "text-red-500"}>
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </span>
          </p>

          <p className="mt-4 text-xl font-bold">
            Price: ${finalPrice.toFixed(2)}{" "}
            {discount > 0 && (
              <span className="line-through ml-2 text-sm text-red-400">
                ${price}
              </span>
            )}
          </p>

          {/* Buy Now Button from Client Component */}
          <BuyNowButton inStock={stock > 0} />
        </div>
      </div>

      <p className="text-sm  mt-8">
        Posted on: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProductDetails;

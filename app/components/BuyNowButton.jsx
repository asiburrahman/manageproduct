"use client";

const BuyNowButton = ({ inStock }) => {
  return (
    <button
      className="btn btn-accent mt-6"
      disabled={!inStock}
      onClick={() => alert("Buying not implemented yet")}
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;

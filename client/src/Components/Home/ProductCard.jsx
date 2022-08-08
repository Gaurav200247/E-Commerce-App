import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ name, price, images, _id, numOfReviews, rating }) => {
  const options = {
    edit: false,
    color: "rgba(107, 107, 107, 0.592)",
    value: rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  // console.log(images);

  return (
    <Link className="product-card" to={`/product/${_id}`}>
      <img src={images[0].url} alt={name} />
      <p>{name.length > 50 ? `${name.substring(0, 35)}...` : name}</p>
      <div>
        <ReactStars {...options} />
        <span> ({numOfReviews} Reviews) </span>
      </div>
      <span>{`₹${price}`}</span>
    </Link>
  );
};

export default ProductCard;

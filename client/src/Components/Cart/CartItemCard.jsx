import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`} className="truncate">
          {window.innerWidth <= 900
            ? `${
                item.name.length >= 12
                  ? `${item.name.substring(0, 11)}...`
                  : item.name
              }`
            : item.name.length > 40
            ? `${item.name.substring(0, 40)}...`
            : item.name}
        </Link>
        <span className="truncate">{`Price : ₹ ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)} className="truncate">
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;

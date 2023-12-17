import React, { useState } from "react";
import { BsSearch, BsCart3 } from "react-icons/bs";
import { FaBars, FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.css";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav
      className={`flex flex-col justify-between w-full upper-nav bg-zinc-800`}
    >
      {/* =================== Upper Nav ===================  */}
      <div className="upper-nav flex justify-between items-center p-5 w-full">
        <Link
          to="/"
          className="nav-logo-container flex justify-center items-center w-3/6"
        >
          <span className="logo-heading text-xl truncate w-full">
            E-Shopping App
          </span>
        </Link>

        <div className="nav-route-links-container flex justify-end items-center tracking-wider    w-2/6">
          <Link to="/" className="nav-route-links  mx-5">
            Home
          </Link>
          <Link to="/products" className="nav-route-links mx-5">
            Products
          </Link>
          {/* <Link to="/contact" className="nav-route-links">
            Contact
          </Link> */}
          {/* <Link to="/about" className="nav-route-links">
            About
          </Link> */}
        </div>

        <div className="nav-icon-links-container flex justify-between items-center pr-10 pl-10 w-1/6 ">
          <Link to="/search" className="nav-icon-links">
            <BsSearch />
          </Link>
          <Link
            to="/cart"
            className="nav-icon-links flex justify-between items-center relative"
          >
            <BsCart3 className={`${cartItems.length > 0 && "mr-4 ml-5"}`} />
            {cartItems.length > 0 && (
              <span className="cart-length">{cartItems.length}</span>
            )}
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="nav-icon-links">
              <FaUserCircle />
            </Link>
          )}
        </div>

        <div className="toggle-btn-container">
          <button
            className={`toggle-btn text-2xl duration-300 ${
              isToggled && "rotate"
            }`}
            onClick={() => setIsToggled(!isToggled)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* =================== Lower Nav ===================  */}
      <div
        className={`lower-nav flex flex-col justify-between items-center w-full ${
          isToggled ? "show" : null
        }`}
      >
        <div className="toggled-nav-route-links-container flex flex-col justify-between items-center tracking-wider p-2 text-lg  w-full">
          <Link to="/" className="toggled-nav-route-links p-2">
            Home
          </Link>
          <Link to="/products" className="toggled-nav-route-links p-2">
            Products
          </Link>
          {/* <Link to="/contact" className="toggled-nav-route-links p-2">
            Contact
          </Link> */}
          {/* <Link to="/about" className="toggled-nav-route-links p-2">
            About
          </Link> */}
        </div>

        <div className="toggled-nav-icon-links-container flex justify-between items-center p-2 ">
          <Link to="/search" className="toggled-nav-icon-links p-2">
            <BsSearch />
          </Link>
          <Link
            to="/cart"
            className="nav-icon-links flex justify-between items-center relative ml-5"
          >
            <BsCart3 className={`${cartItems.length > 0 && "mr-4 ml-3"}`} />
            {cartItems.length > 0 && (
              <span className="cart-length">{cartItems.length}</span>
            )}
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="nav-icon-links ml-5">
              <FaUserCircle />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

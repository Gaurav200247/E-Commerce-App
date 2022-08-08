import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import AppStore from "../../Images/Appstore.png";
import PlayStore from "../../Images/playstore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className=" text-white flex justify-between items-center max-w-full">
      {/* --------------------------------- */}
      <div className="left-footer flex flex-col justify-between items-center">
        <h1>DOWNLOAD OUR APP</h1>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={PlayStore} alt="playstore-download-icons" />
        <img src={AppStore} alt="appstore-download-icons" />
      </div>
      {/* --------------------------------- */}
      <div className="mid-footer flex flex-col justify-between items-center">
        <div className="logo flex justify-between items-center">
          <h1 className="logo-text  truncate">E-Shopping App</h1>
        </div>

        <p className="mt-2">High quality is our first priority</p>

        <p>Copyrights 2022 &copy; Gaurav Gupta</p>
      </div>
      {/* --------------------------------- */}
      <div className="right-footer flex flex-col justify-between items-center">
        <h4>Follow Us</h4>
        <div className="follow-icons-container flex justify-between items-center w-full">
          <a
            href="https://www.instagram.com/gaurav_op_22/"
            className="social-media-btn mb-2 text-fuchsia-600"
          >
            <AiOutlineInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-gupta-b14482231/"
            className="social-media-btn mb-2 text-sky-500"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://discordapp.com/users/Gaurav%20Gupta#2647"
            className="social-media-btn mb-2 text-blue-700"
          >
            <BsDiscord />
          </a>
        </div>
      </div>
      {/* --------------------------------- */}
    </footer>
  );
};

export default Footer;

import React from "react";
import Avatar from "@mui/material/Avatar";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import "./About.css";

const About = () => {
  return (
    <div className="aboutSectionContainer">
      <div className="about-info-container">
        <div className="about-avatar-block">
          <h1>About Me</h1>

          <div>
            <Avatar
              style={{ width: "12vmax", height: "12vmax", margin: "1vmax 0" }}
              alt="Founder"
              src="https://res.cloudinary.com/dyprxjmzi/image/upload/v1657268426/Ecommerce%20App%20Avatars/founder_pic1_l1fpxw.jpg"
            />
            <h2>
              {" "}
              <b> Gaurav Gupta </b>{" "}
            </h2>
          </div>
        </div>

        <div className="about-info-block">
          <div className="info-block">
            This is my first Full Stack Website created by using MERN Stack.{" "}
            <br />
            Created on - 8th July 2022
          </div>
          <div className="follow-links-block">
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
      </div>
    </div>
  );
};

export default About;

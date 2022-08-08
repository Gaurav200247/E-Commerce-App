import React, { useState } from "react";
import { Rating } from "@mui/material";

import profileImg from "../Images/Profile.png";

const ReviewCard = ({ name, comment, ratings }) => {
  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div className="review-card">
      <img src={profileImg} alt="User" />
      <p>{name}</p>
      <Rating {...options} />
      <span className="review-card-comment">
        {isReadMore ? comment : `${comment.substring(0, 150)}`}

        {comment.length > 100 && (
          <span
            className="ReadMoreBtn ml-2 text-blue-600 cursor-pointer"
            onClick={() => setIsReadMore(!isReadMore)}
          >
            {isReadMore ? "Show Less" : "Read More"}
          </span>
        )}
      </span>
    </div>
  );
};

export default ReviewCard;

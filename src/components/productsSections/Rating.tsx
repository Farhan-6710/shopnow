import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

interface RatingProps {
  rating: number; // e.g., 4.5
  totalStars: number; // Total number of stars, e.g., 5
}

const Rating: React.FC<RatingProps> = ({ rating, totalStars }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center" style={{ fontSize: "1.25rem" }}>
      {" "}
      {/* Adjust fontSize as needed */}
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          className="text-yellow-400 mx-0.5 icon-size"
        />
      ))}
      {/* Render half star */}
      {halfStar && (
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          className="text-yellow-400 mx-0.5"
        />
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="text-gray-300 mx-0.5"
        />
      ))}
      <small className="ml-2 text-gray-600">({rating.toFixed(1)})</small>
    </div>
  );
};

export default Rating;

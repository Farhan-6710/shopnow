import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

interface RatingProps {
  rating: number; // e.g., 4.5
  totalStars: number; // Total number of stars, e.g., 5
}

const Rating = ({ rating, totalStars }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div
      className="flex items-center"
      style={{ fontSize: "1.25rem" }}
      aria-label={`Rating: ${rating} out of ${totalStars} stars`}
    >
      {" "}
      {/* Adjust fontSize as needed */}
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          className="text-primary mx-0.3 icon-size"
          aria-hidden="true"
        />
      ))}
      {/* Render half star */}
      {halfStar && (
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          className="text-primary mx-0.3 icon-size"
          aria-hidden="true"
        />
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="icon-size"
          aria-hidden="true"
        />
      ))}
      <small className="text-sm ml-2 dark:text-gray-200 text-gray-700">
        ({rating.toFixed(1)})
      </small>
    </div>
  );
};

export default Rating;

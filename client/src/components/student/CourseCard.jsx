import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useAppContext();
  const navigate = useNavigate();

  if (!course) return null;

  const rating = calculateRating(course) || 0;
  const price = course.coursePrice || 0;
  const discount = course.discount || 0;
  const finalPrice = (price - (discount * price) / 100).toFixed(2);

  const goToCourse = () => {
    navigate(`/course/${course._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={goToCourse}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg cursor-pointer hover:shadow-md transition-all duration-300"
    >
      {/* FIX: Ensure the src points to the unique course data first */}
      <img
        className="w-full h-48 object-cover"
        src={course.courseThumbnail ? course.courseThumbnail : assets.course_1_thumbnail}
        alt={course.courseTitle}
        onError={(e) => {
          e.target.src = assets.course_1_thumbnail; // Only switch if the link actually breaks
        }}
      />

      <div className="p-3 text-left">
        <h3 className="text-base font-semibold truncate">
          {course.courseTitle}
        </h3>

        <p className="text-gray-500 text-sm">
          {course.educator?.name || "Unknown Educator"}
        </p>

        <div className="flex items-center space-x-2 mt-1">
          <p className="font-medium text-yellow-600">{rating.toFixed(1)}</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="w-3.5 h-3.5"
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt="star"
              />
            ))}
          </div>

          <p className="text-gray-500 text-xs">
            ({course.courseRatings?.length || 0})
          </p>
        </div>

        <p className="text-base font-semibold text-gray-800 mt-2">
          {currency}{finalPrice}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;






import React from "react";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Icône cœur vide
//import StarIcon from "@mui/icons-material/Star"; // Icône étoile

const Review = ({
    author = 'text',
  date = 'text',
  content = '',
  stars = '',
}) => {
  return (
    <div className="flex items-start space-x-4">
        <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
        <div className="w-full">
            <div className="flex justify-between">
                <p className="font-bold">{author}</p>
                <p className="text-yellow-400">★★★★★ {stars} </p>
            </div>
            <p className="text-sm text-gray-400">{date}</p>
            <p className="mt-2">{content}</p>
        </div>
    </div>
  );
};

export default Review;

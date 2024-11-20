import React from "react";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Icône cœur vide
//import StarIcon from "@mui/icons-material/Star"; // Icône étoile

const CarCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-[600px] space-y-4 relative">
      {/* Icône Cœur */}
      <div className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer">
        {/* <FavoriteBorderIcon /> */}
      </div>

      {/* Titre et Avis */}
      <div>
        <h3 className="text-xl font-bold text-gray-800">Nissan GT – R</h3>
        <div className="flex items-center space-x-1 mt-1">
          {/* <StarIcon className="text-yellow-500 text-sm" />
          <StarIcon className="text-yellow-500 text-sm" />
          <StarIcon className="text-yellow-500 text-sm" />
          <StarIcon className="text-yellow-500 text-sm" />
          <StarIcon className="text-gray-300 text-sm" /> */}
          <p className="text-yellow-400">★★★★☆</p>
          <span className="text-sm text-gray-500 ml-2">440+ Reviewer</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500">
        NISMO has become the embodiment of Nissan's outstanding performance,
        inspired by the most unforgiving proving ground, the "race track".
      </p>

      {/* Informations principales */}
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-500  ">
        <div>
          <span className="block ">Type Car</span>
        </div>

        <div>
          <span className="block font-bold text-gray-800">Sport</span>
        </div>
        <div>
          <span className="block ">Capacity</span>
        </div>

        <div>
          <span className="block font-bold text-gray-800">2 person</span>
        </div>

        <div>
          <span className="block ">Steering</span>
        </div>

        <div>
          <span className="block font-bold text-gray-800">Manual</span>
        </div>
        <div>
          <span className="block ">Gasoline</span>
        </div>

        <div>
          <span className="block font-bold text-gray-800">70L</span>
        </div>
     
      </div>

         
       

      {/* Prix et Bouton */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-gray-800">$80.00</span>
          <span className="text-sm text-gray-400"> / days</span>
          <p className="text-xs text-gray-400 line-through">$100.00</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;

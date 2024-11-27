import React from "react";

const CarFeatureCard = () => {
  return (
  
      <div>
       
        <div className=" ">
        {/* Car Description */}
          <div className="items-center align-center bg-blue-600  min-h-[250px] rounded-lg shadow-lg">
            <div className="bg-blue-600 p-4 rounded-lg text-white">
                <h2 className="font-bold text-xl">Sports car with the best design and acceleration</h2>
                <p className="mt-2">Safety and comfort while driving a futuristic and elegant sports car.</p>
            </div>
          </div>
          <div className=" grid grid-cols-3 p-6 rounded-lg mt-4">
            <div className="bg-blue-300 w-24 h-24 rounded-lg mt-4"></div>
            <div className="bg-blue-300 w-24 h-24 rounded-lg mt-4"></div>
            <div className="bg-blue-300 w-24 h-24 rounded-lg mt-4"></div>
          </div>
          
        </div>
        
    </div>
  );
};

export default CarFeatureCard;

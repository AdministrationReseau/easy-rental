import React from "react";
import Image from "next/image";

const CarFeatureCard = () => {
  return (
  
      <div>
       
        
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-blue-600 rounded-lg shadow-lg min-h-[500px]">
        {/* Car Description */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left text-white p-6 rounded-lg">
                <h2 className="font-bold text-xl text-2xl md:text-4xl font-bold mb-4 ">Sports car with the best design and acceleration</h2>
                <p className="text-sm md:text-base mb-6">Safety and comfort while driving a futuristic and elegant sports car.</p>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Image
                src="/voiture.png"
                alt="Earn with us"
                width={1000}
                height={600}
                className="rounded-lg object-cover w-full max-w-md"
              />
            </div>
        </div>
          
        
        
    </div>
  );
};

export default CarFeatureCard;

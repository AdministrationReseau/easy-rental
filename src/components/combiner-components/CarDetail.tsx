'use client';

import React from "react";
import CarCard from "@/components/combiner-components/CarCard";
import CarFeatureCard from "@/components/base-component/CarFeatureCard";
import CarFeatures from "@/components/base-component/CarFeatures";
import Link from "next/link";
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupIcon from '@mui/icons-material/Group';
import Reviews from "../Reviews";
import { CarProps } from "@/utils/types/CarProps";


const CarDetail: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  return (
    <div className="space-y-8 bg-red w-full">
      <Link href="/customer/cars">
        <h1 className="p-4 m-4">&gt; Back to Vehicles</h1>
      </Link>
      
      {/* Car Details Section */}
      <div className="flex flex-col md:flex-row gap-6 w-full rounded-lg ">
        {/* Car Description */}
        <div className="w-[60%]  px-4">
            <CarFeatureCard vehicle={vehicle} />
        </div>
       <div className="w-[40%] px-4 ">
          {/* Car Info */}
          <CarCard vehicle={vehicle} />
       </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-4 gap-4 text-center text-gray-500">
        <div className="flex flex-col">
          <span><AddRoadIcon/></span>
          <span className="material-icons">speed</span>
          <p>Mileage ({vehicle.service_history[(vehicle.service_history.length-1)].mileage}Km)</p>
        </div>
        <div className="flex flex-col">
         <span><DirectionsCarIcon/></span>
          <span className="material-icons">directions_car</span>
          <p>Steering ({vehicle.transmission})</p>
        </div>
        <div className="flex flex-col">
          <span><LocalGasStationIcon/></span>
          <span className="material-icons">local_gas_station</span>
          <p>Fuel ({vehicle.engine.type})</p>
        </div>
        <div className="flex flex-col">
          <span><GroupIcon/></span>
          <span className="material-icons">local_mall</span>
          <p>Capacity ({vehicle.passenger} persons)</p>
        </div>
      </div>

      {/* Features Section */}
      <CarFeatures vehicleFeatures={vehicle.fonctionnalities} />

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h4 className="font-bold text-lg">Reviews</h4>
        
          {vehicle.reviews.map((review : any, index: number) => (
            <Reviews
              key={index}
              name={review.reviewer}
              starsValue={review.rating}
              message={review.comment}
          />
        ))}
        
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-bold text-lg">You would also like</h4>
        
      </div>
    </div>
  );
};

export default CarDetail;

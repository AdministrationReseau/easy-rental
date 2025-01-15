'use client';

import React, { useState } from "react";
import Link from "next/link";
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupIcon from '@mui/icons-material/Group';
import Reviews from "../Reviews";
import { CarProps } from "@/utils/types/CarProps";
import Stars from "../Stars";

export const VehicleImage: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  
  const [currentImage, setCurrentImage] = useState(vehicle.images[0]);

  if (!vehicle) {
    return <p>Loading...</p>;
  }


  return (
    <div className="px-2 w-full">
      {/* Main Image Section */}
      <div
        className="relative bg-cover bg-center min-h-[300px] min-w-[500px] rounded-lg shadow-lg w-full"
        style={{ backgroundImage: `url(${currentImage})` }}
      ></div>

      {/* Thumbnail Images Section */}
      <div className="flex justify-left mt-6 w-full  gap-6">
        {vehicle.images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center w-36 h-40 rounded-lg cursor-pointer"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setCurrentImage(image)}
          ></div>
        ))}
      </div>
    </div>
  );
};


export const VehicleInfo: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full space-y-4 ">
      {/* Favorite Icon Placeholder */}
      <div className="absolute top-10 right-10 text-gray-400 hover:text-red-500 cursor-pointer">
        ♥
      </div>

      {/* Title and Rating */}
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          {vehicle.brand} {vehicle.model}
        </h3>
        <span className='flex flex-row py-4 gap-2'>
          <Stars value={vehicle.rating ?? 0} precision={1} />
            {vehicle.reviews.length} + Reviewer
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 py-2">{vehicle.description.join(' ')}</p>

      {/* Specifications */}
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-500 py-4">
        <div>
          <span className="block py-2">Type</span>
          <span className="block font-bold text-gray-800">{vehicle.type}</span>
        </div>
        <div>
          <span className="block py-2">Capacity</span>
          <span className="block font-bold text-gray-800">{vehicle.passenger} persons</span>
        </div>
        <div>
          <span className="block py-2">Steering</span>
          <span className="block font-bold text-gray-800">{vehicle.transmission}</span>
        </div>
        <div>
          <span className="block py-2">Fuel</span>
          <span className="block font-bold text-gray-800">{vehicle.engine.capacity}L</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-center py-4">
        <div>
          <span className="text-xl font-bold text-gray-800">${vehicle.pricePerDay}.00</span>
          <span className="text-sm text-gray-400"> / day</span>
          <p className="text-xs text-gray-400 line-through">
            ${vehicle.pricePerDay * 1.25}.00
          </p>
        </div>
      </div>
    </div>
  );
};

interface FeatureProps {
  name: string;
  checked: boolean;
}

const CheckboxOne: React.FC<FeatureProps> = ({ name, checked }) => (
  <div className="flex items-center space-x-2">
    <input type="checkbox" className="w-4 h-4" checked={checked} disabled />
    <label className="text-sm">{name}</label>
  </div>
);

export const VehicleFeatures: React.FC<{ vehicleFeatures: Record<string, boolean> }> = ({ vehicleFeatures }) => {
  const features = [
    "Air Condition",
    "Child Seat",
    "GPS",
    "USB Input",
    "Bluetooth",
    "Luggage",
    "Seat Belt",
    "Sleeping Bed",
    "Water",
    "Audio Input",
    "Onboard Computer",
    "Additional Covers",
  ];

  const isValidFeaturesObject = vehicleFeatures && typeof vehicleFeatures === 'object';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-4 text-gray-500">
      {features.map((feature, index) => (
        <CheckboxOne
          key={index}
          name={feature}
          checked={isValidFeaturesObject ? vehicleFeatures[feature.toLowerCase().replace(/ /g, '_')] : false}
        />
      ))}
    </div>
  );
};

const CarDetail: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  return (
    <div className="space-y-8 bg-red w-full">
      <Link href="/cars">
        <h1 className="p-4 m-4">&gt; Back to Vehicles</h1>
      </Link>

      {/* Car Details Section */}
      <div className="flex flex-col md:flex-row gap-6 w-full rounded-lg ">
        {/* Car Description */}
        <div className="w-[60%]  px-4">
          <VehicleImage vehicle={vehicle} />
        </div>
        <div className="w-[40%] px-4 ">
          {/* Car Info */}
          <VehicleInfo vehicle={vehicle} />
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-4 gap-4 text-center text-gray-500">
        <div className="flex flex-col">
          <span><AddRoadIcon /></span>
          <span className="material-icons">speed</span>
          <p>Mileage ({vehicle.service_history[(vehicle.service_history.length - 1)].mileage}Km)</p>
        </div>
        <div className="flex flex-col">
          <span><DirectionsCarIcon /></span>
          <span className="material-icons">directions_car</span>
          <p>Steering ({vehicle.transmission})</p>
        </div>
        <div className="flex flex-col">
          <span><LocalGasStationIcon /></span>
          <span className="material-icons">local_gas_station</span>
          <p>Fuel ({vehicle.engine.type})</p>
        </div>
        <div className="flex flex-col">
          <span><GroupIcon /></span>
          <span className="material-icons">local_mall</span>
          <p>Capacity ({vehicle.passenger} persons)</p>
        </div>
      </div>

      {/* Features Section */}
      <VehicleFeatures vehicleFeatures={vehicle.fonctionnalities} />

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h4 className="font-bold text-lg">Reviews</h4>

        {vehicle.reviews.map((review: {reviewer:string, comment: string;rating: number;}, index: number) => (
          <Reviews
            key={index}
            name={review.reviewer}
            starsValue={review.rating}
            message={review.comment}
          />
        ))}

      </div>
    </div>
  );
};

export default CarDetail;

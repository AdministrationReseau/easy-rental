'use client';

import React, { useState } from "react";
import Link from "next/link";
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupIcon from '@mui/icons-material/Group';
import { Heart } from "lucide-react";
import Reviews from "../Reviews";
import { CarProps } from "@/utils/types/CarProps";
import Stars from "../Stars";

const VehicleImage: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  const [currentImage, setCurrentImage] = useState(vehicle.images[0]);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${currentImage})` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {vehicle.images.slice(0, 3).map((image, index) => (
          <button
            key={index}
            className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-200
              ${currentImage === image ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:opacity-80'}`}
            onClick={() => setCurrentImage(image)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const VehicleInfo: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {vehicle.brand} {vehicle.model}
          </h1>
          <div className="flex items-center gap-2">
            <Stars value={vehicle.rating ?? 0} precision={1} />
            <span className="text-sm text-gray-600">
              ({vehicle.reviews.length} reviews)
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Type", value: vehicle.type },
          { label: "Capacity", value: `${vehicle.passenger} persons` },
          { label: "Transmission", value: vehicle.transmission },
          { label: "Engine", value: `${vehicle.engine.capacity}L` },
        ].map((spec, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <span className="text-sm text-gray-500 block">{spec.label}</span>
            <span className="font-semibold text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between pt-4 border-t">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">
            ${vehicle.pricePerDay}
            <span className="text-sm font-normal text-gray-500">/day</span>
          </p>
          <p className="text-sm text-gray-500 line-through">
            ${vehicle.pricePerDay * 1.25}
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

const VehicleFeatures: React.FC<{ vehicleFeatures: Record<string, boolean> }> = ({
  vehicleFeatures,
}) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const isAvailable = vehicleFeatures[feature.toLowerCase().replace(/ /g, '_')];
          return (
            <div
              key={feature}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isAvailable ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={isAvailable}
                disabled
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm">{feature}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CarDetail: React.FC<{ vehicle: CarProps }> = ({ vehicle }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        href="/cars"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="mr-2">←</span>
        Back to Vehicles
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <VehicleImage vehicle={vehicle} />
        </div>
        <div className="lg:col-span-2">
          <VehicleInfo vehicle={vehicle} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            icon: <AddRoadIcon className="h-6 w-6" />,
            label: "Mileage",
            value: `${vehicle.service_history[vehicle.service_history.length - 1].mileage}Km`
          },
          {
            icon: <DirectionsCarIcon className="h-6 w-6" />,
            label: "Transmission",
            value: vehicle.transmission
          },
          {
            icon: <LocalGasStationIcon className="h-6 w-6" />,
            label: "Fuel Type",
            value: vehicle.engine.type
          },
          {
            icon: <GroupIcon className="h-6 w-6" />,
            label: "Capacity",
            value: `${vehicle.passenger} persons`
          }
        ].map((spec, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center space-y-2"
          >
            <div className="text-blue-600">{spec.icon}</div>
            <span className="text-sm text-gray-500">{spec.label}</span>
            <span className="font-medium text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>

      <VehicleFeatures vehicleFeatures={vehicle.fonctionnalities} />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Reviews ({vehicle.reviews.length})
          </h2>
          <button className="text-blue-600 hover:text-blue-700">
            Write a Review
          </button>
        </div>
        <div className="space-y-6">
          {vehicle.reviews.map((review, index) => (
            <Reviews
              key={index}
              name={review.reviewer_name}
              starsValue={review.rating}
              message={review.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetail;

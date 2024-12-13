import React from 'react';
import Link from 'next/link';
import Stars from '../Stars';

// Interface pour définir le type Vehicle
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  rating: number;
  reviews: {
    comment: string,
    reviewer: string,
    rating: number,
}[];
  description: string[]; // Supposons que la description soit un tableau de chaînes
  type: string;
  passenger: number;
  transmission: string;
  engine: {
    capacity: number;
  };
  pricePerDay: number;
}

const CarCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full space-y-4 max-w-md mx-auto relative">
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
          <Stars value={vehicle.rating} precision={1} />
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
        <Link href={`/customer/cars/${vehicle.id}/location`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

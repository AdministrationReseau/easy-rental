'use client';

import React from 'react';
import { CarCard } from '@/components/CarCard';
import { CarProps } from '@/utils/types/CarProps';
import { VehicleListProps } from '@/utils/types/CarProps';


const VehicleList: React.FC<VehicleListProps> = ({ vehicles, filters }) => {
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (!vehicle) return false;

    const matchesType =
      filters.type.length === 0 || (vehicle.type && filters.type.includes(vehicle.type));

    const matchesCapacity =
      filters.capacity === null || (vehicle.passenger && vehicle.passenger >= filters.capacity);

    const matchesPrice =
      typeof vehicle.pricePerDay === 'number' &&
      vehicle.pricePerDay >= filters.priceRange[0] &&
      vehicle.pricePerDay <= filters.priceRange[1];

    return matchesType && matchesCapacity && matchesPrice;
  });

  return (
    <div className="p-5 w-full flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <CarCard
              key={vehicle.id}
              id={vehicle.id}
              images={vehicle.images}
              brand={vehicle.brand}
              model={vehicle.model}
              transmission={vehicle.transmission}
              engine={vehicle.engine}
              passenger={vehicle.passenger || 4}
              pricePerDay={vehicle.pricePerDay}
              onLike={(id: number) => {}}
              onDislike={(id: number) => {}}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vehicles available matching your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default VehicleList;

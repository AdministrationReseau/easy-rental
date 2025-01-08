'use client';

import React from 'react';
import { CarCard } from '@/components/CarCard';
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
      <div className="flex flex-row flex-wrap gap-6 w-full justify-center">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <CarCard
            key={vehicle.id}
            id={vehicle.id}
            images={vehicle.images}
            brand={vehicle.brand}
            rating={vehicle.rating}
            reviews={vehicle.reviews}
            model={vehicle.model}
            transmission={vehicle.transmission}
            engine={vehicle.engine}
            passenger={vehicle.passenger || 4}
            pricePerDay={vehicle.pricePerDay}
            type={vehicle.type} 
            year={vehicle.year} 
            description ={vehicle.description} 
            vin={vehicle.vin} 
            fonctionnalities={vehicle.fonctionnalities}
            color={vehicle.color} 
            fuel_efficiency={vehicle.fuel_efficiency} 
            license_plate={vehicle.license_plate} 
            registration={vehicle.registration} 
            owner={vehicle.owner} 
            service_history={vehicle.service_history} 
            insurance={vehicle.insurance} 
            onLike={function (id: number): void {console.log(id)}} 
            onDislike={function (id: number): void {console.log(id)} }
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

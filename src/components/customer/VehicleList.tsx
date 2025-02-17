'use client';

import React, { useState } from 'react';
import { CarCard } from '@/components/CarCard';
import { VehicleListProps } from '@/utils/types/CarProps';

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, filters }) => {
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const itemsPerPage = 6; // Nombre d'éléments par page

  // Filtrer les véhicules selon les critères
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

  // Calculer les indices de début et de fin pour la pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <div className="p-5 w-full justify-center">
      {/* Liste des véhicules */}
      <div className="flex justify-center flex-row flex-wrap gap-6 w-full justify-start">
        {paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
            <CarCard
              key={vehicle.id}
              {...vehicle}
              onLike={(id: number) => console.log(id)}
              onDislike={(id: number) => console.log(id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vehicles available matching your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredVehicles.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleList;

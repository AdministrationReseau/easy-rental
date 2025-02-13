'use client';

import React, { useState } from 'react';
import { DriverListProps } from '@/utils/types/DriverProps';
import DriverCard from './DriverCard';

const OrgDriverList: React.FC<DriverListProps> = ({ drivers, filters }) => {
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const itemsPerPage = 8; // Nombre d'éléments par page

  // Filtrer les véhicules selon les critères
  const filteredDrivers = drivers.filter((driver) => {
    if (!driver) return false;

    const matchesRating =
      typeof driver.rating === 'number' &&
      driver.rating >= filters.ratingRange[0] &&
      driver.rating <= filters.ratingRange[1];

    console.log('rating:', matchesRating);

    const matchesAge =
      typeof driver.age === 'number' &&
      driver.age >= filters.ageRange[0] &&
      driver.age <= filters.ageRange[1];

    console.log('age:', matchesAge);
    console.log('filters:', filters);

    const matchesLocation =
      filters.location === '' || (driver.location && filters.location && driver.location.includes(filters.location));

    console.log('location:', matchesLocation);

    return matchesRating && matchesAge && matchesLocation;
  });

  // Calculer les indices de début et de fin pour la pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDrivers = filteredDrivers.slice(startIndex, endIndex);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  return (
    <div className="p-5 w-full">
      {/* Liste des véhicules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedDrivers.length > 0 ? (
          paginatedDrivers.map((driver) => (
            <DriverCard
              key={driver.id}
              first_name={driver.first_name}
              last_name={driver.last_name}
              email={driver.email}
              location={driver.location}
              age={driver.age}
              profile_picture={driver.profile_picture}
              rating={driver.rating}
              phone={driver.phone}
              id={driver.id}
              license_number={driver.license_number}
              license_type={driver.license_type}
              address={driver.address}
              vehicle_assigned={driver.vehicle_assigned}
              insurance_provider={driver.insurance_provider}
              insurance_policy={driver.insurance_policy}
              onSelect={() => {}}
              isSelected={false}
              onEdit={(id: number) => console.log(id)}
              onDelete={(id: number) => console.log(id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No drivers available matching your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredDrivers.length > itemsPerPage && (
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

export default OrgDriverList;

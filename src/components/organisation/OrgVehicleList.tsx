'use client';

import React, { useState } from 'react';
import { CarCard } from '@/components/organisation/CarCard';
import {CarProps, VehicleListProps} from '@/utils/types/CarProps';
import VehicleModal from "@/components/VehicleModal";

const OrgVehicleList: React.FC<VehicleListProps> = ({ vehicles, setVehicles, filters }) => {
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const itemsPerPage = 8; // Nombre d'éléments par page
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<CarProps | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCreateVehicle = (vehicleData: Partial<CarProps>) => {
    const newVehicle: CarProps = {
      ...vehicleData as CarProps,
      id: vehicles.length + 1,
      engine: {
        type: undefined,
        horsepower: undefined,
        capacity: undefined
      },
      service_history: [],
      reviews: [],
      favorite: false
    };

    setVehicles([...vehicles, newVehicle]);
    setShowCreateModal(false);
    setShowAlert(true);
  };

  const handleModifyVehicle = ( vehicleData: Partial<CarProps>) => {
    if (!editingVehicle) return;
    const updatedVehicles = vehicles.map(vehicle =>
        vehicle.id === editingVehicle.id ? { ...vehicle, ...vehicleData } : vehicle
    );

    setVehicles(updatedVehicles);
    setEditingVehicle(null);
    setShowAlert(true);
  };

  const handleDeleteVehicle = ( id: number) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  // Filtrer les véhicules selon les critères
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (!vehicle) return false;

    const matchesType =
      filters.type.length === 0 || (vehicle.type && filters.type.includes(vehicle.type));

    console.log('type: ', matchesType);

    const matchesCapacity =
      filters.capacity === null || (vehicle.passenger && vehicle.passenger >= filters.capacity);

      console.log('capacity:', matchesCapacity);

    const matchesPrice =
      // typeof vehicle.pricePerDay === 'number' &&
      vehicle.pricePerDay >= filters.priceRange[0] &&
      vehicle.pricePerDay <= filters.priceRange[1];

    console.log('price:', matchesPrice);

    return matchesType && matchesCapacity && matchesPrice;
  });

  console.log(filteredVehicles.length);

  // Calculer les indices de début et de fin pour la pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <div className="p-5 w-full">
      {/* Liste des véhicules */}
      <div className="flex flex-row flex-wrap gap-6 w-full justify-start">
        {paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
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
              description={vehicle.description}
              vin={vehicle.vin}
              fonctionnalities={vehicle.fonctionnalities}
              color={vehicle.color}
              fuel_efficiency={vehicle.fuel_efficiency}
              license_plate={vehicle.license_plate}
              registration={vehicle.registration}
              owner={vehicle.owner}
              service_history={vehicle.service_history}
              insurance={vehicle.insurance}
              favorite={vehicle.favorite}
              available={vehicle.available}
              onLike={(id: number) => console.log(id)}
              onDislike={(id: number) => console.log(id)}
              onEdit={() => { setEditingVehicle(vehicle); }}
              onDelete={ () => {handleDeleteVehicle( vehicle.id)}}
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

      <VehicleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateVehicle}
          title="Create Vehicle"
      />

      <VehicleModal
          isOpen={!!editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSubmit={handleModifyVehicle}
          initialData={editingVehicle}
          title="Edit Vehicle"
      />

      {showAlert && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
            Vehicle successfully {editingVehicle ? 'updated' : 'created'}!
          </div>
      )}
    </div>
  );
};

export default OrgVehicleList;

'use client';

import React, { useState, useEffect } from 'react';
import { CarCard } from '@/components/organisation/CarCard';
import { CarProps, VehicleListProps } from '@/utils/types/CarProps';
import VehicleModal from '@/components/VehicleModal';
import { PlusCircle, ChevronLeft, ChevronRight, Loader2, Check } from 'lucide-react';

const OrgVehicleList: React.FC<VehicleListProps> = ({ vehicles, setVehicles, filters }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<CarProps | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleCreateVehicle = (vehicleData: Partial<CarProps>): void => {
    setIsLoading(true);

    setTimeout(() => {
      const newVehicle: CarProps = {
        ...vehicleData as CarProps,
        id: vehicles.length + 1,
        engine: { type: undefined, horsepower: undefined, capacity: undefined },
        service_history: [],
        reviews: [],
        favorite: false,
      };

      setVehicles([...vehicles, newVehicle]);
      setShowCreateModal(false);
      setAlertMessage('Véhicule créé avec succès!');
      setShowAlert(true);
      setIsLoading(false);
    }, 600);
  };

  const handleModifyVehicle = (vehicleData: Partial<CarProps>): void => {
    if (!editingVehicle) return;

    setIsLoading(true);

    setTimeout(() => {
      const updatedVehicles = vehicles.map(vehicle =>
        vehicle.id === editingVehicle.id ? { ...vehicle, ...vehicleData } : vehicle
      );

      setVehicles(updatedVehicles);
      setEditingVehicle(null);
      setAlertMessage('Véhicule mis à jour avec succès!');
      setShowAlert(true);
      setIsLoading(false);
    }, 600);
  };

  const handleDeleteVehicle = (id: number): void => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule?')) {
      setIsLoading(true);

      setTimeout(() => {
        const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
        setVehicles(updatedVehicles);
        setAlertMessage('Véhicule supprimé avec succès!');
        setShowAlert(true);
        setIsLoading(false);
      }, 600);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType =
      filters.type.length === 0 || (vehicle.type && filters.type.includes(vehicle.type));
    const matchesCapacity =
      filters.capacity === null || (vehicle.passenger && vehicle.passenger >= filters.capacity);
    const matchesPrice =
      vehicle.pricePerDay >= filters.priceRange[0] && vehicle.pricePerDay <= filters.priceRange[1];

    return matchesType && matchesCapacity && matchesPrice;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const generatePageNumbers = (): number[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="p-5 w-full">
      {/* Header avec bouton de création */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Véhicules ({filteredVehicles.length})</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center sm:justify-start"
        >
          <PlusCircle size={18} className="mr-2" />
          Ajouter un véhicule
        </button>
      </div>

      {/* Grille de véhicules avec dimensions fixes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <Loader2 className="animate-spin mr-2" size={30} />
            <span>Chargement en cours...</span>
          </div>
        ) : paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="w-[280px] min-w-[280px]">
              <CarCard
                {...vehicle}
                onLike={(id: number) => {
                  const updatedVehicles = vehicles.map(v =>
                    v.id === id ? { ...v, favorite: true } : v
                  );
                  setVehicles(updatedVehicles);
                }}
                onDislike={(id: number) => {
                  const updatedVehicles = vehicles.map(v =>
                    v.id === id ? { ...v, favorite: false } : v
                  );
                  setVehicles(updatedVehicles);
                }}
                onEdit={() => { setEditingVehicle(vehicle); }}
                onDelete={handleDeleteVehicle}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-xl p-6 w-full">
            <div className="mb-4 p-4 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M10 18s.8.4 2 .4 2-.4 2-.4"></path>
                <circle cx="12" cy="12" r="8"></circle>
                <path d="M8 9.05v-.1"></path>
                <path d="M16 9.05v-.1"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-1">Aucun véhicule disponible</p>
            <p className="text-sm text-gray-500 max-w-md">
              Aucun véhicule ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou ajoutez un nouveau véhicule.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredVehicles.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 overflow-x-auto">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            {/* Bouton première page (desktop) */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="relative hidden md:inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Première page</span>
              <ChevronLeft className="h-4 w-4 mr-1" />
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Bouton page précédente */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === 1 && !filteredVehicles.length ? 'rounded-l-md' : ''}`}
            >
              <span className="sr-only">Page précédente</span>
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Numéros de page */}
            <div className="hidden sm:flex">
              {generatePageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === pageNum
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Indicateur de page mobile */}
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium sm:hidden">
              {currentPage} / {totalPages}
            </span>

            {/* Bouton page suivante */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Page suivante</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Bouton dernière page (desktop) */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="relative hidden md:inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Dernière page</span>
              <ChevronRight className="h-4 w-4 mr-1" />
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}

      {/* Modals */}
      <VehicleModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateVehicle}
        title="Créer un véhicule"
      />

      <VehicleModal
        isOpen={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
        onSubmit={handleModifyVehicle}
        initialData={editingVehicle}
        title="Modifier un véhicule"
      />

      {/* Alerte de succès */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          <Check size={20} className="mr-2" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <Loader2 className="animate-spin mr-3 text-blue-600" size={24} />
            <span className="text-gray-700">Traitement en cours...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgVehicleList;

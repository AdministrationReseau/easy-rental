'use client';

import React, { useState, useEffect } from 'react';
import VehicleList from '@/components/customer/VehicleList';
import SidebarFilter from '@/components/customer/SideBarFilter';
import LocationFilter from '@/components/LocationFilter';
import CarDetail from '@/components/combiner-components/CarDetail';

interface FilterProps {
  type: string[];
  capacity: number | null;
  priceRange: [number, number];
}

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterProps>({
    type: [],
    capacity: null,
    priceRange: [0, Infinity],
  });
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  useEffect(() => {
    fetch('/data/cars.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
      });
  }, []);

  const handleFilterChange = (newFilters: FilterProps) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <main className="flex flex-col mt-14">
          <div className="filter-container">
            <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
          </div>
        {/* Display CarDetail if a vehicle is selected */}
        {selectedVehicle && (
          <div className="mb-4">
            <CarDetail vehicle={selectedVehicle} />
          </div>
        )}

        <div className="flex">
          
          <div className="flex justify-center items-center flex-col ml-56">
            <LocationFilter />
            <VehicleList
              vehicles={vehicles}
              filters={filters}
             // Pass down the function
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

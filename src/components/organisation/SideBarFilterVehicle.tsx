'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { CarProps } from '@/utils/types/CarProps';
import { FilterVehicleProps } from '@/utils/types/CarProps';

const SidebarFilter: React.FC<{ vehicles: CarProps[]; onFilter: (filters: FilterVehicleProps) => void }> = ({
  vehicles,
  onFilter,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPassengers, setSelectedPassengers] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    const prices = vehicles.map((vehicle) => vehicle.pricePerDay || 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
    setPriceRange([minPrice, maxPrice]);
  }, [vehicles]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (passenger: number) => {
    setSelectedPassengers((prev) =>
      prev.includes(passenger) ? prev.filter((c) => c !== passenger) : [...prev, passenger]
    );
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const applyFilters = () => {
    const filters = {
      type: selectedTypes,
      capacity: selectedPassengers.length > 0 ? Math.max(...selectedPassengers) : null,
      priceRange,
    };
    onFilter(filters);
    console.log(filters);
    console.log(selectedPassengers)
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPassengers([]);
    setPriceRange([
      Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0)),
      Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000)),
    ]);
    onFilter({
      type: [],
      capacity: null,
      priceRange: [0, 100000],
    });
  };

  const [typeOpened, setTypeOpened] = useState(false);
  const [capacityOpened, setCapacityOpened] = useState(false);
  const [priceOpened, setPriceOpened] = useState(false);

  const toogleType = () => {
    setTypeOpened(!typeOpened);
    setCapacityOpened(false);
    setPriceOpened(false);
  }

  const toogleCapacity = () => {
    setCapacityOpened(!capacityOpened);
    setTypeOpened(false);
    setPriceOpened(false);
  }

  const tooglePrice = () => {
    setPriceOpened(!priceOpened);
    setTypeOpened(false);
    setCapacityOpened(false);
  }

  const showFilters = () => {
    setTypeOpened(false);
    setCapacityOpened(false);
    setPriceOpened(false);
  }


  return (
    // <div className="mx-auto flex flex-col h-fit w-[100%]">
    
    <div className="mx-auto flex flex-col w-full h-fit ">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col w-full items-center">
        
        <h2 className="text-xl font-semibold cursor-pointer mb-4" onClick={showFilters}>
          Filters
        </h2>

        
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-6">
          
          {/* Filtre par Type */}
          <div className="flex flex-col w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3
              className={`cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg text-md ${
                typeOpened ? 'font-bold' : 'font-medium'
              }`}
              onClick={toogleType}
            >
              Type {typeOpened ? ':' : ''}
            </h3>
            {typeOpened && (
              <ul className="mt-2 flex flex-wrap gap-3">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.type || 'Unknown'))).map((type) => (
                  <li key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <span className="text-sm">{type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtre par Nombre de Passagers */}
          <div className="flex flex-col w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3
              className={`cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg text-md ${
                capacityOpened ? 'font-bold' : 'font-medium'
              }`}
              onClick={toogleCapacity}
            >
              Passengers {capacityOpened ? ':' : ''}
            </h3>
            {capacityOpened && (
              <ul className="mt-2 flex flex-wrap gap-3">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.passenger || 4))).map((passenger) => (
                  <li key={passenger} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPassengers.includes(passenger)}
                      onChange={() => handleCapacityChange(passenger)}
                    />
                    <span className="text-sm">{`${passenger}`}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtre par Prix */}
          <div className="flex flex-col w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3
              className={`cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg text-md ${
                priceOpened ? 'font-bold' : 'font-medium'
              }`}
              onClick={tooglePrice}
            >
              Price {priceOpened ? ':' : ''}
            </h3>
            {priceOpened && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                  max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                  className="w-full"
                />
                <span className="text-sm text-gray-700">{priceRange[0]} - {priceRange[1]} FCFA</span>
              </div>
            )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700" onClick={applyFilters}>
            Apply Filters
          </button>
          <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-400" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default SidebarFilter;

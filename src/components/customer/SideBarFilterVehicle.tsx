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
  const [isMobile, setIsMobile] = useState(false); // Vérifie si l'écran est en mode mobile
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Gère l'état du popup


  useEffect(() => {
    const prices = vehicles.map((vehicle) => vehicle.pricePerDay || 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
    setPriceRange([minPrice, maxPrice]);
  
    // Gère le changement de la taille de l'écran
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
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
    setIsPopupOpen(false)

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
    setIsPopupOpen(false)
  };

  return (
    <div>
      {isMobile ? (
        <> {/* Bouton pour ouvrir le popup */}
        <button
          className="fixed bottom-4 right-4 bg-primary-blue text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsPopupOpen(true)}
        >
          Filters
        </button>

        {/* Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[80%] max-h-[90%] overflow-y-auto shadow-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-600"
                onClick={() => setIsPopupOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              {/* Contenu du filtre */}
              <div>
                <div className="mb-4">
                  <h3 className="font-semibold">Type</h3>
                  <ul className="flex flex-wrap gap-3 my-4">
                    {Array.from(new Set(vehicles.map((vehicle) => vehicle.type || 'Unknown'))).map((type) => (
                      <li key={type} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                        />
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold">Passengers</h3>
                  <ul className="flex flex-wrap gap-3 my-4">
                    {Array.from(new Set(vehicles.map((vehicle) => vehicle.passenger || 4))).map((passenger) => (
                      <li key={passenger} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedPassengers.includes(passenger)}
                          onChange={() => handleCapacityChange(passenger)}
                        />
                        <span>{`${passenger}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold">Price</h3>
                  <div className="flex items-center justify-between w-full gap-4">
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                      max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                    />
                    <span className='w-full'>{`${priceRange[0]} - ${priceRange[1]} XAF`}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-primary-blue text-white px-4 py-2 rounded"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
    <div className="flex flex-col h-screen-[90%]  w-[250px] sticky top-0">
      <div className='bg-white rounded-lg shadow-lg flex flex-col p-4 h-[90%]  w-[250px]'>
        <div className=' w-full h-full overflow-y-auto relative'>
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Type</h3>
            <ul className="space-y-2">
              {Array.from(new Set(vehicles.map((vehicle) => vehicle.type || 'Unknown'))).map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Passengers</h3>
            <ul className="space-y-2">
              {Array.from(new Set(vehicles.map((vehicle) => vehicle.passenger || 4))).map((passenger) => (
                <li key={passenger} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPassengers.includes(passenger)}
                    onChange={() => handleCapacityChange(passenger)}
                  />
                  <span>{`${passenger} persons`}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="m-4 w-[80%]">
            <h3 className="text-md font-medium mb-2">Price</h3>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
              max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
            />
            <div className="flex justify-between text-sm">
              <span>{priceRange[0]} CFA</span>
              <span>{priceRange[1]} CFA</span>
            </div>
          </div>

          <div className="flex gap-2 m-4">
            <button className="bg-primary-blue text-white p-2 rounded-lg flex-grow" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="bg-gray-300 text-gray-700 p-2 rounded-lg flex-grow" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
     )}
    </div>
  );
};

export default SidebarFilter;

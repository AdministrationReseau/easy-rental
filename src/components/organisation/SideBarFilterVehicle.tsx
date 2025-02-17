'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { CarProps } from '@/utils/types/CarProps';
import { FilterVehicleProps } from '@/utils/types/CarProps';

const SidebarFilter: React.FC<{
  vehicles: CarProps[];
  onFilter: (filters: FilterVehicleProps) => void
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>> }>

= ({
  vehicles,
  onFilter,
  isPopupOpen,
  setIsPopupOpen,
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

    setIsPopupOpen(false);
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

    setIsPopupOpen(false);
  };

  return (
    <div className=' shadow-md' >
      {isPopupOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-[90%] overflow-y-auto shadow-lg relative flex flex-col gap-4">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setIsPopupOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold px-4">Filters</h2>
            
            {/* Type Filter */}
            <div className='w-full flex flex-col justify-center gap-1'>
              <div className="flex gap-4">
                <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Type</h3>
                <ul className="flex gap-3">
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

              <div className="flex gap-4">
                <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Passengers</h3>
                <ul className="flex gap-2 items-center">
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

                <div className="flex flex-row gap-4 items-center">
                  <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Price</h3>
                    <div className='flex flex-row gap-4 w-64 items-center'>
                      <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                        max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                      />
                      
                        <span className='text-nowrap'>{priceRange[0]} - {priceRange[1]} FCFA</span>
                      
                    </div>
                </div>
            </div>

            <div className="w-1/2 mx-auto flex flex-col xl:flex-row gap-2">
              <button className="bg-primary-blue text-white p-2 rounded-lg flex-grow" onClick={applyFilters}>
                Apply Filters
              </button>
              <button className="bg-gray-300 text-gray-700 p-2 rounded-lg flex-grow" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col h-fit w-[100%]">
          <div className='bg-white rounded-lg shadow-sm flex flex-col h-full w-full '>
            <div className='w-full h-full relative flex'>
            <div className='flex w-full gap-8 justify-between items-center px-4'>
                <h2 className="text-xl font-semibold px-4 hidden xl:block">Filters</h2>
                
                {/* Type Filter */}
                <div className='flex flex-col gap-1'>
                  <div className="flex gap-4">
                    <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Type</h3>
                    <ul className="flex gap-3">
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

                  <div className="flex gap-4">
                    <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Passengers</h3>
                    <ul className="flex gap-2 items-center">
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

                    <div className="flex flex-row gap-4 items-center">
                      <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Price</h3>
                        <div className='flex flex-row gap-4 w-64 items-center'>
                          <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                            max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                          />
                          
                            <span className='text-nowrap'>{priceRange[0]} - {priceRange[1]} FCFA</span>
                          
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify gap-2">
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
        </div>
      )}
    </div>
  );
};

export default SidebarFilter;

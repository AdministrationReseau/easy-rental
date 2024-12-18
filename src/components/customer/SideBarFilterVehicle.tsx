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

  return (
    <div className="h-[600px] flex flex-col p-1 w-[230px]">
      <div className='bg-white fixed h-[600px] shadow-lg flex flex-col p-4 w-[230px]'>
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

      <div className="mb-6">
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

      <div className="flex gap-2">
        <button className="bg-primary-blue text-white p-2 rounded-lg flex-grow" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="bg-gray-300 text-gray-700 p-2 rounded-lg flex-grow" onClick={clearFilters}>
          Clear
        </button>
      </div>
      </div>
    </div>
  );
};

export default SidebarFilter;

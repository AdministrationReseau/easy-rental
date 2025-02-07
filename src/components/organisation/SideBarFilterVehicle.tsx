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
    <div className="mx-auto flex flex-col h-fit w-[100%]">
      <div className='bg-white rounded-md shadow-lg flex flex-col h-full w-[95%]'>
        <div className='w-full h-full relative'>
          <div className='flex flex-col w-full items-center px-4'>
            <h2 className="w-1/6 text-lg font-semibold" onClick={showFilters}>Filters</h2>
            
            <div className='w-full flex justify-center gap-8'>
              {!(capacityOpened || priceOpened) &&
                <div className="flex gap-4">
                  <h3 className={`cursor-pointer bg-primary-blue/80 text-white p-1 px-2 rounded-lg text-md ${typeOpened ? 'font-bold' : 'font-medium'}`} onClick={toogleType}>Type {typeOpened ? ':' : ''}</h3>
                    {typeOpened &&
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
                    }
                </div>
              }

              {!(typeOpened || priceOpened) &&
                <div className="flex gap-4">
                  <h3 className={`cursor-pointer bg-primary-blue/80 text-white p-1 px-2 rounded-lg text-md ${capacityOpened ? 'font-bold' : 'font-medium '}`} onClick={toogleCapacity}>Passengers {capacityOpened ? ':' : ''}</h3>
                  {capacityOpened &&
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
                  }
                </div>
              }

              {!(capacityOpened || typeOpened) &&
                <div className="flex flex-row gap-4 items-center">
                  <h3 className={`cursor-pointer bg-primary-blue/80 text-white p-1 px-2 rounded-lg text-md ${priceOpened ? 'font-bold' : 'font-medium'}`} onClick={tooglePrice}>Price {priceOpened ? ':' : ''}</h3>
                  {priceOpened &&
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
                  }
                </div>
              }
            </div>

            <div className="w-2/6 flex gap-4 m-4">
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
  );
};

export default SidebarFilter;

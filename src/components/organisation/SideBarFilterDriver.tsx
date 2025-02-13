'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { DriverProps, FilterDriverProps } from '@/utils/types/DriverProps';

const SidebarFilter: React.FC<{
  drivers: DriverProps[];
  onFilter: (filters: FilterDriverProps) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>> }>
  
= ({
  drivers,
  isPopupOpen,
  setIsPopupOpen,
  onFilter,
}) => {
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
  const [location, setLocation] = useState<string>('');
  const [locations, setLocations] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const ages = drivers.map((driver) => driver.age);
    const minAge = ages.length > 0 ? Math.min(...ages) : 18;
    const maxAge = ages.length > 0 ? Math.max(...ages) : 65;
    setAgeRange([minAge, maxAge]);

    const ratings = drivers.map((driver) => driver.rating);
    const minRating = ratings.length > 0 ? Math.floor(Math.min(...ratings)) : 0;
    const maxRating = ratings.length > 0 ? Math.ceil(Math.max(...ratings)) : 5;
    setRatingRange([minRating, maxRating]);

    const uniqueLocations = Array.from(new Set(drivers.map((driver) => driver.location)));
    setLocations(uniqueLocations);
  }, [drivers]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as [number, number]);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRatingRange(newValue as [number, number]);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const applyFilters = () => {
    const filters: FilterDriverProps = {
      ratingRange,
      ageRange,
      location,
    };
    onFilter(filters);
    console.log(filters);
    
    setIsPopupOpen(false);
  };

  const clearFilters = () => {
    setAgeRange([
      Math.min(...drivers.map((driver) => driver.age)),
      Math.max(...drivers.map((driver) => driver.age)),
    ]);
    setRatingRange([
      Math.floor(Math.min(...drivers.map((driver) => driver.rating))), 
      Math.ceil(Math.max(...drivers.map((driver) => driver.rating))),
    ]);
    setLocation('');
    
    onFilter({
      ageRange: [18, 65],
      ratingRange: [0, 5],
      location: '',
    });

    setIsPopupOpen(false);
  };

  return (
    <div>
      {isPopupOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[80%] max-h-[90%] overflow-y-auto shadow-lg relative flex flex-col gap-4">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setIsPopupOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            
            <div className='flex flex-col items-center gap-1'>
                <div className="flex flex-row gap-4 justify-center items-center">
                  <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Age</h3>
                  <div className="flex flex-row justify-center gap-4 w-64 items-center">
                    <Slider
                      value={ageRange}
                      onChange={handleAgeChange}
                      valueLabelDisplay="auto"
                      min={Math.min(...drivers.map((driver) => driver.age))}
                      max={Math.max(...drivers.map((driver) => driver.age))}
                    />
                    <span className='text-nowrap'>{`${ageRange[0]} - ${ageRange[1]} years`}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-4 justify-center items-center">
                  <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Rating</h3>
                  <div className="flex flex-row gap-4 w-64 items-center">
                    <Slider
                      value={ratingRange}
                      onChange={handleRatingChange}
                      valueLabelDisplay="auto"
                      min={Math.floor(Math.min(...drivers.map((driver) => driver.rating)))}
                      max={Math.ceil(Math.max(...drivers.map((driver) => driver.rating)))}
                    />
                    <span className='text-nowrap'>{`${ratingRange[0]} - ${ratingRange[1]} stars`}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-4 justify-center items-center">
                  <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Location</h3>
                  <div className="flex flex-row gap-4 w-64 items-center">
                    <select name="location" id="location" value={location} onChange={handleLocationChange} className='py-1 px-2 bg-white ring-1 ring-primary-blue/30 rounded-md w-64'>
                      <option value="">All</option>

                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    
                    </select>
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
        <div className="mx-auto flex flex-col h-fit w-[95%]">
          <div className="bg-white rounded-lg shadow-sm flex flex-col h-full w-full">
            <div className="w-full h-full relative">
              <div className='flex w-full gap-8 justify-between items-center px-4'>
              <h2 className="text-xl font-semibold px-4 hidden xl:block">Filters</h2>
                
                <div className='flex flex-col gap-1'>
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Age</h3>
                      <div className="flex flex-row justify-center gap-4 w-64 items-center">
                        <Slider
                          value={ageRange}
                          onChange={handleAgeChange}
                          valueLabelDisplay="auto"
                          min={Math.min(...drivers.map((driver) => driver.age))}
                          max={Math.max(...drivers.map((driver) => driver.age))}
                        />
                        <span className='text-nowrap'>{`${ageRange[0]} - ${ageRange[1]} years`}</span>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 justify-center items-center">
                      <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Rating</h3>
                      <div className="flex flex-row gap-4 w-64 items-center">
                        <Slider
                          value={ratingRange}
                          onChange={handleRatingChange}
                          valueLabelDisplay="auto"
                          min={Math.floor(Math.min(...drivers.map((driver) => driver.rating)))}
                          max={Math.ceil(Math.max(...drivers.map((driver) => driver.rating)))}
                        />
                        <span className='text-nowrap'>{`${ratingRange[0]} - ${ratingRange[1]} stars`}</span>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 justify-center items-center">
                      <h3 className='cursor-pointer font-bold p-1 px-2 rounded-lg text-md w-28'>Location</h3>
                      <div className="flex flex-row gap-4 w-64 items-center">
                        <select name="location" id="location" value={location} onChange={handleLocationChange} className='py-1 px-2 bg-white ring-1 ring-primary-blue/30 rounded-md w-64'>
                          <option value="">All</option>

                          {locations.map((location, index) => (
                            <option key={index} value={location}>
                              {location}
                            </option>
                          ))}
                        
                        </select>
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

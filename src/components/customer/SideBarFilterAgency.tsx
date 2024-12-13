'use client';

import React, { useState, useEffect } from 'react';

const SidebarFilter: React.FC<{ vehicles: any[]; onFilter: (filters: any) => void }> = ({
  vehicles,
  onFilter,
}) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);


  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((t) => t !== city) : [...prev, city]
    );
  };

  const handleStarsChange = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((c) => c !== stars) : [...prev, stars]
    );
  };

  function applyFilters() {
        const filters = {
            city: selectedCities,
            capacity: selectedStars.length > 0 ? Math.max(...selectedStars) : null,
        };
        onFilter(filters);
        console.log(filters);
        console.log(selectedStars);
    }

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedStars([]);
    onFilter({
      city: [],
      stars: null,
    });
  };

  return (
    <div className="bg-white h-full fixed shadow-lg flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">City</h3>
        <ul className="space-y-2">
          {Array.from(new Set(vehicles.map((vehicle) => vehicle.city || 'Unknown'))).map((city) => (
            <li key={city} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => handleCityChange(city)}
              />
              <span>{city}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Stars</h3>
        <ul className="space-y-2">
          {Array.from(new Set(vehicles.map((vehicle) => vehicle.stars|| 4))).map((stars) => (
            <li key={stars} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStars.includes(stars)}
                onChange={() => handleStarsChange(stars)}
              />
              <span>{`${stars} persons`}</span>
            </li>
          ))}
        </ul>
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
  );
};

export default SidebarFilter;

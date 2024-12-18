'use client';

import React, { useState, useEffect } from 'react';
import Stars from '../Stars';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';

const SidebarFilter: React.FC<{ agencies: AgencyProps[]; onFilter: (filters: FilterAgencyProps) => void }> = ({
  agencies,
  onFilter,
}) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const ratingRanges = [
    { stars: 5, min: 4.1, max: 5 },
    { stars: 4, min: 3.1, max: 4 },
    { stars: 3, min: 2.1, max: 3 },
    { stars: 2, min: 1.1, max: 2 },
    { stars: 1, min: 0, max: 1 },
  ];

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((t) => t !== city) : [...prev, city]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };


  function applyFilters() {
    const selectedRanges = selectedRating.map((stars) =>
      ratingRanges.find((range) => range.stars === stars)
    );

    const filteredAgencies = agencies.filter((agency) => {
      const rating = agency.rating || 0;
      return selectedRanges.some((range) => range && rating >= range.min && rating <= range.max);
    });

    const filters = {
      city: selectedCities,
      rating: selectedRating.length > 0 ? Math.max(...selectedRating) : null,
    };
    onFilter(filters);
    console.log('Filtered Agencies:', filteredAgencies);
    console.log('Filters:',filters);
    console.log(selectedRating);
  }

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedRating([]);
    onFilter({
      city: [],
      rating: null,
    });
  };

  return (
    <div className="h-[600px] flex flex-col p-1 w-[230px]">
      <div className='bg-white fixed h-[600px] shadow-lg flex flex-col p-4 w-[230px]'>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">City</h3>
          <ul className="space-y-2">
            {Array.from(new Set(agencies.map((agency) => agency.city || 'Unknown'))).map((city) => (
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
            {ratingRanges.map(({ stars }) => (
              <li key={stars} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRating.includes(stars)}
                  onChange={() => handleRatingChange(stars)}
                />
                <span>
                  <Stars value={stars} precision={1} />
                </span>
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
    </div>
  );
};

export default SidebarFilter;

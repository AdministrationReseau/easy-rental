'use client';

import React, { useState } from 'react';
import Stars from '../Stars';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';
import { Slider } from '@mui/material';

const SidebarFilter: React.FC<{ agencies: AgencyProps[]; onFilter: (filters: FilterAgencyProps) => void }> = ({
  agencies,
  onFilter,
}) => {
  const [selectedCities, setSelectedCities] = useState<string[]>(['all']);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<'open' | 'all'>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [followersRange, setFollowersRange] = useState<number[]>(() => {
    if (agencies.length === 0) {
      return [0, 100]; // Défaut si aucune donnée n'est disponible
    }
    return [
      Math.min(...agencies.map((agency) => agency.followers)),
      Math.max(...agencies.map((agency) => agency.followers))
    ];
  });

  const ratingRanges = [
    { stars: 5, min: 4.1, max: 5 },
    { stars: 4, min: 3.1, max: 4 },
    { stars: 3, min: 2.1, max: 3 },
    { stars: 2, min: 1.1, max: 2 },
    { stars: 1, min: 0, max: 1 },
  ];

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCities(value === 'all' ? ['all'] : [value]);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleStatusChange = () => {
    setStatusFilter(statusFilter === 'all' ? 'open' : 'all');
  };

  const isAgencyOpen = (agency: AgencyProps) => {
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const [openingHour, openingMinute] = agency.openingTime.split(':').map(Number);
    const [closingHour, closingMinute] = agency.closingTime.split(':').map(Number);

    const openingTime = openingHour * 100 + openingMinute;
    const closingTime = closingHour * 100 + closingMinute;

    return currentTime >= openingTime && currentTime <= closingTime;
  };

  const applyFilters = () => {
    const selectedRanges = selectedRating.map((stars) =>
      ratingRanges.find((range) => range.stars === stars)
    );

    const filteredAgencies = agencies.filter((agency) => {
      const rating = agency.rating || 0;
      const matchesRating =
        selectedRanges.length === 0 ||
        selectedRanges.some((range) => range && rating >= range.min && rating <= range.max);

      const matchesCity = selectedCities.length === 1 && selectedCities[0] !== 'all' ? selectedCities.includes(agency.city) : true;

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(agency.type);

      const matchesStatus = statusFilter === 'all' || isAgencyOpen(agency);

      return matchesRating && matchesCity && matchesType && matchesStatus;
    });

    const filters: FilterAgencyProps = {
      city: selectedCities,
      rating: selectedRating.length > 0 ? Math.max(...selectedRating) : null,
      type: selectedTypes,
      status: statusFilter,
      followers: followersRange,
    };

    onFilter(filters);
    console.log('Filtered Agencies:', filteredAgencies);
    console.log('Filters:', filters);
  };

  const clearFilters = () => {
    setSelectedCities(['all']);
    setSelectedRating([]);
    setSelectedTypes([]);
    setStatusFilter('all');
    setFollowersRange([
      Math.min(...agencies.map((agency) => agency.followers)),
      Math.max(...agencies.map((agency) => agency.followers)),
    ]);
    onFilter({
      city: [],
      rating: null,
      type: [],
      status: 'all',
      followers: [0, 100],
    });
  };

  return (
    <div className="flex flex-col h-[90%]  w-[250px]">
      <div className='bg-white rounded-lg shadow-lg flex flex-col p-4 h-[90%]  w-[250px] fixed'>
        <div className=' w-full h-full overflow-y-scroll relative'>
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">City</h3>
            <select
              value={selectedCities[0]} // Display only the selected city or "all"
              onChange={handleCityChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="all">All</option>
              {Array.from(new Set(agencies.map((agency) => agency.city || 'Unknown'))).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Type</h3>
            <ul className="space-y-2">
              {Array.from(new Set(agencies.map((agency) => agency.type))).map((type) => (
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
            <h3 className="text-md font-medium mb-2">Status</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={statusFilter === 'open'}
                onChange={handleStatusChange}
              />
              <span>Open Only</span>
            </label>
          </div>

          <div className="m-4 w-[80%]">
            <h3 className="text-md font-medium mb-2">Followers</h3>
            <Slider
              value={followersRange}
              onChange={(event, newValue) => setFollowersRange(newValue)}
              valueLabelDisplay="auto"
              min={Math.min(...agencies.map((agency) => agency.followers))}
              max={Math.max(...agencies.map((agency) => agency.followers))}
            />
            <div className="flex justify-between text-sm">
              <span>Min: {followersRange[0]}</span>
              <span>Max: {followersRange[1]}</span>
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
  );
};

export default SidebarFilter;

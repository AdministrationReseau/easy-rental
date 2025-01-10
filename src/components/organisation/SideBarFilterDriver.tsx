'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { DriverProps, FilterDriverProps } from '@/utils/types/DriverProps';

const SidebarFilter: React.FC<{ drivers: DriverProps[]; onFilter: (filters: FilterDriverProps) => void }> = ({
  drivers,
  onFilter,
}) => {
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);

  useEffect(() => {
    const ages = drivers.map((driver) => driver.age);
    const minAge = ages.length > 0 ? Math.min(...ages) : 18;
    const maxAge = ages.length > 0 ? Math.max(...ages) : 65;
    setAgeRange([minAge, maxAge]);

    const ratings = drivers.map((driver) => driver.rating);
    const minRating = ratings.length > 0 ? Math.min(...ratings) : 0;
    const maxRating = ratings.length > 0 ? Math.max(...ratings) : 5;
    setRatingRange([minRating, maxRating]);
  }, [drivers]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as [number, number]);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRatingRange(newValue as [number, number]);
  };

  const applyFilters = () => {
    const filters: FilterDriverProps = {
      ageRange,
      rating: ratingRange[1],
    };
    onFilter(filters);
    console.log(filters);
  };

  const clearFilters = () => {
    setAgeRange([
      Math.min(...drivers.map((driver) => driver.age)),
      Math.max(...drivers.map((driver) => driver.age)),
    ]);
    setRatingRange([
      Math.min(...drivers.map((driver) => driver.rating)),
      Math.max(...drivers.map((driver) => driver.rating)),
    ]);
    onFilter({
      ageRange: [18, 65],
      rating: 5,
    });
  };

  const [ageOpened, setAgeOpened] = useState(false);
  const [ratingOpened, setRatingOpened] = useState(false);

  const toogleAge = () => {
    setAgeOpened(!ageOpened);
    setRatingOpened(false);
  };

  const toogleRating = () => {
    setRatingOpened(!ratingOpened);
    setAgeOpened(false);
  };

  const showFilters = () => {
    setAgeOpened(false);
    setRatingOpened(false);
  };

  return (
    <div className="mx-auto flex flex-col h-fit w-[95%]">
      <div className="bg-white rounded-md shadow-lg flex flex-col h-full w-[95%]">
        <div className="w-full h-full overflow-y-scroll relative">
          <div className="flex w-full items-center px-4">
            <h2 className="w-1/6 text-lg font-semibold" onClick={showFilters}>Filters</h2>
            
            <div className="w-full flex gap-8">
              {!(ratingOpened) &&
                <div className="flex flex-row gap-4 items-center">
                  <h3 className={`cursor-pointer bg-primary-blue/80 text-white p-1 px-2 rounded-lg text-md" ${ageOpened ? 'font-bold' : 'font-medium'}`} onClick={toogleAge}>Age {ageOpened ? ':' : ''}</h3>
                  {ageOpened &&
                    <div className="flex flex-row gap-4 w-64 items-center">
                      <Slider
                        value={ageRange}
                        onChange={handleAgeChange}
                        valueLabelDisplay="auto"
                        min={18}
                        max={65}
                      />
                      <span>{`${ageRange[0]} - ${ageRange[1]} years`}</span>
                    </div>
                  }
                </div>
              }

              {!(ageOpened) &&
                <div className="flex flex-row gap-4 items-center">
                  <h3 className={`cursor-pointer bg-primary-blue/80 text-white p-1 px-2 rounded-lg text-md" ${ratingOpened ? 'font-bold' : 'font-medium'}`} onClick={toogleRating}>Rating {ratingOpened ? ':' : ''}</h3>
                  {ratingOpened &&
                    <div className="flex flex-row gap-4 w-64 items-center">
                      <Slider
                        value={ratingRange}
                        onChange={handleRatingChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                      />
                      <span>{`${ratingRange[0]} - ${ratingRange[1]} stars`}</span>
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

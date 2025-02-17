import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings2, X, Check, ChevronDown } from 'lucide-react';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';

const SidebarFilter: React.FC<{
  vehicles: CarProps[];
  onFilter: (filters: FilterVehicleProps) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ vehicles, onFilter, isPopupOpen, setIsPopupOpen }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPassengers, setSelectedPassengers] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const prices = vehicles.map((vehicle) => vehicle.pricePerDay || 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
    setPriceRange([minPrice, maxPrice]);
  }, [vehicles]);

  useEffect(() => {
    const count = selectedTypes.length + selectedPassengers.length +
      (priceRange[0] !== Math.min(...vehicles.map(v => v.pricePerDay || 0)) ||
       priceRange[1] !== Math.max(...vehicles.map(v => v.pricePerDay || 100000)) ? 1 : 0);
    setActiveFiltersCount(count);
  }, [selectedTypes, selectedPassengers, priceRange, vehicles]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (passenger: number) => {
    setSelectedPassengers(prev =>
      prev.includes(passenger) ? prev.filter(c => c !== passenger) : [...prev, passenger]
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
    setIsPopupOpen(false);
    setActiveDropdown(null);
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
    setActiveDropdown(null);
  };

  const DropdownButton = ({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
        transition-all duration-200 border
        ${active ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      {label}
      {count && count > 0 && (
        <span className="bg-blue-600 text-white rounded-full text-xs px-2 py-0.5">{count}</span>
      )}
      <ChevronDown className={`h-4 w-4 transition-transform ${active ? 'transform rotate-180' : ''}`} />
    </button>
  );

  const DesktopFilter = () => (
    <Card className="w-full mx-32 rounded-lg shadow-sm bg-white">
      <div className="p-4 mx-44 flex flex-wrap items-center gap-4">
        {/* Type Filter */}
        <div className="relative">
          <DropdownButton
            label="Vehicle Type"
            active={activeDropdown === 'type'}
            count={selectedTypes.length}
            onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
          />
          {activeDropdown === 'type' && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.type || 'Unknown'))).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                      transition-all duration-200 border
                      ${selectedTypes.includes(type)
                        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                      }
                    `}
                  >
                    {type}
                    {selectedTypes.includes(type) && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Passengers Filter */}
        <div className="relative">
          <DropdownButton
            label="Passengers"
            active={activeDropdown === 'passengers'}
            count={selectedPassengers.length}
            onClick={() => setActiveDropdown(activeDropdown === 'passengers' ? null : 'passengers')}
          />
          {activeDropdown === 'passengers' && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.passenger || 4)))
                  .sort((a, b) => a - b)
                  .map((passenger) => (
                    <button
                      key={passenger}
                      onClick={() => handleCapacityChange(passenger)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                        transition-all duration-200 border
                        ${selectedPassengers.includes(passenger)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                        }
                      `}
                    >
                      {passenger} {passenger === 1 ? 'seat' : 'seats'}
                      {selectedPassengers.includes(passenger) && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <DropdownButton
            label="Price Range"
            active={activeDropdown === 'price'}
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
          />
          {activeDropdown === 'price' && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#2563eb',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#2563eb',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e5e7eb',
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: '#2563eb',
                  }
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{priceRange[0].toLocaleString()} FCFA</span>
                <span>{priceRange[1].toLocaleString()} FCFA</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          )}
          <Button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );

  // Mobile view - Dialog
  const MobileDialog = () => (
    <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] overflow-y-auto">
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button
              variant="ghost"
              onClick={() => setIsPopupOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Vehicle Type</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.type || 'Unknown'))).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                      transition-all duration-200 border
                      ${selectedTypes.includes(type)
                        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                      }
                    `}
                  >
                    {type}
                    {selectedTypes.includes(type) && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Passenger Capacity</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(vehicles.map((vehicle) => vehicle.passenger || 4)))
                  .sort((a, b) => a - b)
                  .map((passenger) => (
                    <button
                      key={passenger}
                      onClick={() => handleCapacityChange(passenger)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                        transition-all duration-200 border
                        ${selectedPassengers.includes(passenger)
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                        }
                      `}
                    >
                      {passenger} {passenger === 1 ? 'seat' : 'seats'}
                      {selectedPassengers.includes(passenger) && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay || 0))}
                  max={Math.max(...vehicles.map((vehicle) => vehicle.pricePerDay || 100000))}
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#2563eb',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#2563eb',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e5e7eb',
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#2563eb',
                    }
                  }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()} FCFA</span>
                  <span>{priceRange[1].toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Show Results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Mobile filter button
  const MobileFilterButton = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <Settings2 className="h-5 w-5" />
        {activeFiltersCount > 0 && (
          <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {activeFiltersCount}
          </div>
        )}
      </button>
    </div>
  );

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.relative')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block sticky top-0 z-40">
        <DesktopFilter />
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="outline"
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white rounded-full text-xs px-2 py-0.5">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
        <MobileFilterButton />
        <MobileDialog />
      </div>
    </>
  );
};

export default SidebarFilter;



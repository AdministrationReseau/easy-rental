'use client';

import { useState, useEffect } from 'react';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';
import OrgVehicleList from '@/components/organisation/OrgVehicleList';
import { Filter, X} from 'lucide-react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [filters, setFilters] = useState<FilterVehicleProps>({
    type: [],
    capacity: null,
    priceRange: [0, Infinity],
  });
  const [selectedVehicle] = useState<CarProps | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetch('/data/cars.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
      });
  }, []);

  const handleFilterChange = (newFilters: FilterVehicleProps) => {
    setFilters(newFilters);
  };

  // Calculate statistics
  const totalVehicles = vehicles.length;
  const averagePrice = totalVehicles > 0
    ? (vehicles.reduce((sum, vehicle) => sum + vehicle.pricePerDay, 0) / totalVehicles).toFixed(2)
    : 'N/A';

  // Count vehicles by type
  const vehiclesByType = vehicles.reduce((acc, vehicle) => {
    acc[(vehicle?.type ?? 0)] = (acc[(vehicle?.type ?? 0)] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get most common vehicle type
  let mostCommonType = 'N/A';
  let maxCount = 0;
  Object.entries(vehiclesByType).forEach(([type, count]) => {
    if (count > maxCount) {
      mostCommonType = type;
      maxCount = count;
    }
  });

  // Price distribution calculation
  const priceRanges = [
    { range: '0-5000', min: 0, max: 5000 },
    { range: '5001-10000', min: 5001, max: 10000 },
    { range: '10001-15000', min: 10001, max: 15000 },
    { range: '15001+', min: 15001, max: Infinity }
  ];

  const priceDistribution = priceRanges.map(range => ({
    range: range.range,
    count: vehicles.filter(v => v.pricePerDay >= range.min && v.pricePerDay <= range.max).length
  }));

  return (
    <div className='h-full w-full p-4 flex flex-col gap-4 p-4 bg-gray-50'>
      {/* Header */}
      <div className='w-full bg-white rounded-lg shadow-sm p-6'>
        <div className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Your vehicles</h2>
            <div className='text-gray-600 text-sm mt-1'>
              Currently managing <span className='font-semibold text-blue-600'>{vehicles.length} vehicles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for General and Statistics */}
      <div className="w-full">
        {/* Tab Headers */}
        <div className="grid grid-cols-2 mb-4 bg-white rounded-lg overflow-hidden">
          <button
            className={`py-3 text-center font-medium transition-colors ${
              activeTab === 'general'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`py-3 text-center font-medium transition-colors ${
              activeTab === 'statistics'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
        </div>

        {/* General Tab Content */}
        <div className={`space-y-4 ${activeTab !== 'general' ? 'hidden' : ''}`}>
          {/* Horizontal Filter for desktop/tablet - Always visible */}
          <div className='hidden md:block'>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <p className="text-sm text-gray-500">Refine your vehicle list</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <SidebarFilter
                  vehicles={vehicles}
                  onFilter={handleFilterChange}
                  isPopupOpen={false}
                  setIsPopupOpen={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Display CarDetail if a vehicle is selected */}
            {selectedVehicle && (
              <div className="border-b border-gray-100">
                <CarDetail vehicle={selectedVehicle} />
              </div>
            )}

            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Vehicle List</h3>
              <p className="text-sm text-gray-500">Manage your fleet</p>
            </div>
            <div className="p-5 w-full md:p-4">
              <div className="max-w-[100%] mx-auto">
                <OrgVehicleList
                  vehicles={vehicles}
                  setVehicles={setVehicles}
                  filters={filters}
                />
              </div>
            </div>
          </div>

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-center justify-center p-4 md:hidden">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">Filter Vehicles</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <SidebarFilter
                    vehicles={vehicles}
                    onFilter={handleFilterChange}
                    isPopupOpen={true}
                    setIsPopupOpen={setIsFilterOpen}
                  />
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Tab Content */}
        <div className={`space-y-6 ${activeTab !== 'statistics' ? 'hidden' : ''}`}>
          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="pb-2">
                <p className="text-sm text-gray-500">Total Vehicles</p>
                <h4 className="text-3xl font-semibold text-gray-900">{totalVehicles}</h4>
              </div>
              <p className="text-sm text-gray-500">Your entire fleet size</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="pb-2">
                <p className="text-sm text-gray-500">Average Price</p>
                <h4 className="text-3xl font-semibold text-gray-900">{averagePrice} <span className="text-sm text-gray-500">XAF</span></h4>
              </div>
              <p className="text-sm text-gray-500">Per day rental fee</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="pb-2">
                <p className="text-sm text-gray-500">Most Common Type</p>
                <h4 className="text-3xl font-semibold text-gray-900">{mostCommonType}</h4>
              </div>
              <p className="text-sm text-gray-500">Based on your inventory</p>
            </div>
          </div>

          {/* Detailed Charts - Using simplified charts for native tailwind */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">Vehicles by Type</h3>
                <p className="text-sm text-gray-500">Distribution across categories</p>
              </div>
              <div className="h-72 flex flex-col justify-center">
                <div className="space-y-2">
                  {Object.entries(vehiclesByType).map(([type, count]) => (
                    <div key={type} className="flex items-center">
                      <div className="w-32 mr-4 text-sm">{type}</div>
                      <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(count / totalVehicles) * 100}%` }}
                        />
                      </div>
                      <div className="ml-3 text-sm font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">Price Distribution</h3>
                <p className="text-sm text-gray-500">Number of vehicles by price range (XAF)</p>
              </div>
              <div className="h-72 flex flex-col justify-center">
                <div className="space-y-4">
                  {priceDistribution.map((item) => (
                    <div key={item.range} className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.range} XAF</span>
                        <span className="text-sm text-gray-700">{item.count} vehicles</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(item.count / totalVehicles) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detailed Vehicle Analysis</h3>
                <p className="text-sm text-gray-500">Comprehensive overview of your fleet</p>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.keys(vehiclesByType).map(type => {
                      const typeVehicles = vehicles.filter(v => v.type === type);
                      const avgPrice = (typeVehicles.reduce((sum, v) => sum + v.pricePerDay, 0) / typeVehicles.length).toFixed(2);
                      const minPrice = Math.min(...typeVehicles.map(v => v.pricePerDay)).toFixed(2);
                      const maxPrice = Math.max(...typeVehicles.map(v => v.pricePerDay)).toFixed(2);

                      return (
                        <tr key={type}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehiclesByType[type]}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{avgPrice} XAF</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{minPrice} XAF</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{maxPrice} XAF</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating filter button */}
      <button
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 z-10 hover:bg-blue-700 transition-colors"
        onClick={() => setIsFilterOpen(true)}
      >
        <Filter className="h-5 w-5" />
        <span>Filters</span>
      </button>
    </div>
  );
}

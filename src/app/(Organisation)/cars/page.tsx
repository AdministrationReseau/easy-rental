'use client';

import { useState, useEffect } from 'react';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';
import OrgVehicleList from '@/components/organisation/OrgVehicleList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Import the Tabs components
import VehicleModal from '@/components/VehicleModal';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [filters, setFilters] = useState<FilterVehicleProps>({
    type: [],
    capacity: null,
    priceRange: [0, Infinity],
  });
  const [selectedVehicle] = useState<CarProps | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // State to manage active tab
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

    const handleCreateVehicle = (vehicleData: Partial<CarProps>) => {
      const newVehicle: CarProps = {
        ...vehicleData as CarProps,
        id: vehicles.length + 1,
        engine: {
          type: undefined,
          horsepower: undefined,
          capacity: undefined
        },
        service_history: [],
        reviews: [],
        favorite: false
      };
  
      setVehicles([...vehicles, newVehicle]);
      setShowCreateModal(false);
      setShowAlert(true);
    };

  return (
    <div className='h-full w-[100%] flex flex-col gap-2 rounded-md'>
      <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Your vehicles</h2>
          <div className='text-gray-600 text-sm'>
            Actually, you have <span className='font-black'>{vehicles.length} vehicles</span>
          </div>
        </div>
        <button
                className="bg-blue-500 inherit w-60 text-white px-4 py-3 rounded mb-4"
                onClick={() => setShowCreateModal(true)}
            >
                + ADD A VEHICLE
            </button>
      </div>

     

      {/* Tabs for General and Statistics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        {/* General Tab Content */}
        <TabsContent value="general" className="space-y-4">
          <div className={`my-4 ${isPopupOpen ? 'block' : 'hidden'} lg:block`}>
            <SidebarFilter
              vehicles={vehicles}
              onFilter={handleFilterChange}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
            />
          </div>

          <div className='w-full h-full'>
            {/* Display CarDetail if a vehicle is selected */}
            {selectedVehicle && (
              <div className="mb-4">
                <CarDetail vehicle={selectedVehicle} />
              </div>
            )}

            <OrgVehicleList
              vehicles={vehicles}
              setVehicles={setVehicles}
              filters={filters}
            />
          </div>

          <button
            className="lg:hidden fixed bottom-4 right-4 bg-primary-blue text-white p-3 rounded-full shadow-lg"
            onClick={() => setIsPopupOpen(true)}
          >
            Filters
          </button>
        </TabsContent>

        {/* Statistics Tab Content */}
        <TabsContent value="statistics" className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Vehicle Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Vehicles</p>
                <p className="font-medium text-lg">{vehicles.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Average Price</p>
                <p className="font-medium text-lg">
                  {vehicles.length > 0
                    ? `${(
                      vehicles.reduce((sum, vehicle) => sum + vehicle.pricePerDay, 0) / vehicles.length
                    ).toFixed(2)} XAF`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>


      {showAlert && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
            Vehicle successfully created!
          </div>
      )}
            <VehicleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateVehicle}
          title="Create Vehicle"
      />
    </div>
  );
}
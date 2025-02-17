'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function ResourceProfilPage() {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // State to manage active tab

  const { id } = useParams<{ id: string }>();
  const vehicleId = Number(id);

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
          setIsLoading(false);
        } else {
          console.error('Unexpected data format:', data);
          setHasError(true);
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
        setHasError(true);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error loading vehicles. Please try again later.</div>;
  }

  if (isNaN(vehicleId)) {
    return <div>Invalid vehicle ID.</div>;
  }

  const requestedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);

  if (!requestedVehicle) {
    return <div>Vehicle not found.</div>;
  }

  return (
    <div className='h-full w-full flex flex-col gap-2 rounded-md'>
      <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
        <h2 className='text-2xl font-bold'>Vehicle Profile</h2>
      </div>

      {/* Tabs for Details and Activity */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Details Tab Content */}
        <TabsContent value="details" className="space-y-4">
          <CarDetail vehicle={requestedVehicle} />
        </TabsContent>

        {/* Activity Tab Content */}
        <TabsContent value="activity" className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Vehicle Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Recent Trips</p>
                <p className="font-medium text-lg">{/* Display recent trips data */}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Miles Driven</p>
                <p className="font-medium text-lg">{/* Display total miles driven */}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

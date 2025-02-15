'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DriverDetail from '@/components/organisation/DriverDetail';
import { DriverProps } from '@/utils/types/DriverProps';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function ResourceProfilPage() {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);
    const [activeTab, setActiveTab] = useState('details'); // State to manage active tab

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch("/data/drivers.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch drivers");
                }
                const data: DriverProps[] = await response.json();
                setDrivers(data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        fetchDrivers();
    }, []);

    const { id } = useParams<{ id: string }>();
    const driverId = Number(id);

    if (isNaN(driverId)) {
        return <div>Invalid vehicle ID</div>
    }

    const requestedDriver = drivers.find(driver => driver.id === driverId);

    if (!requestedDriver) {
        return <div>Invalid driver ID</div>
    }

    return (
      <div className='h-full w-full flex flex-col gap-2 rounded-md'>
          <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
              <h2 className='text-2xl font-bold'>Driver Profile</h2>
          </div>

          {/* Tabs for Details and Activity */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Details Tab Content */}
              <TabsContent value="details" className="space-y-4">
                  <DriverDetail driver={requestedDriver} />
              </TabsContent>

              {/* Activity Tab Content */}
              <TabsContent value="activity" className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold mb-4">Driver Activity</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-500">Recent Trips</p>
                              <p className="font-medium text-lg">{/* Display recent trips data */}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-500">Total Hours Driven</p>
                              <p className="font-medium text-lg">{/* Display total hours driven */}</p>
                          </div>
                      </div>
                  </div>
              </TabsContent>
          </Tabs>
      </div>
    );
}

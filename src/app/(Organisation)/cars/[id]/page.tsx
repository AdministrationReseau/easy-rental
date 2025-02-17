'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Car, CreditCard, TrendingUp } from 'lucide-react';

interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  revenue: number;
  customer: string;
  status: 'completed' | 'ongoing' | 'upcoming';
}

interface VehicleActivity {
  totalRevenue: number;
  totalTrips: number;
  totalMiles: number;
  monthlyRevenue: { month: string; revenue: number }[];
  recentRentals: Rental[];
}

export default function ResourceProfilPage() {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const { id } = useParams<{ id: string }>();
  const vehicleId = Number(id);

  // Sample activity data - replace with actual data fetching
  const vehicleActivity: VehicleActivity = {
    totalRevenue: 15750,
    totalTrips: 42,
    totalMiles: 3850,
    monthlyRevenue: [
      { month: 'Jan', revenue: 2500 },
      { month: 'Feb', revenue: 3000 },
      { month: 'Mar', revenue: 2800 },
      { month: 'Apr', revenue: 3200 },
      { month: 'May', revenue: 4250 },
    ],
    recentRentals: [
      {
        id: 1,
        startDate: '2024-02-10',
        endDate: '2024-02-15',
        revenue: 450,
        customer: 'John Doe',
        status: 'completed'
      },
      {
        id: 2,
        startDate: '2024-02-20',
        endDate: '2024-02-25',
        revenue: 500,
        customer: 'Jane Smith',
        status: 'ongoing'
      },
    ]
  };

  useEffect(() => {
    fetch('/data/cars.json')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
          setIsLoading(false);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
        setHasError(true);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading vehicles. Please try again later.</div>;
  if (isNaN(vehicleId)) return <div>Invalid vehicle ID.</div>;

  const requestedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);
  if (!requestedVehicle) return <div>Vehicle not found.</div>;

  return (
    <div className="h-full w-full flex flex-col gap-4 p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicle Profile</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CarDetail vehicle={requestedVehicle} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalRevenue}XAF</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalTrips}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalMiles}</div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vehicleActivity.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Rentals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicleActivity.recentRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{rental.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {rental.startDate} - {rental.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">${rental.revenue}</p>
                        <p className={`text-sm ${
                          rental.status === 'completed' ? 'text-green-500' :
                          rental.status === 'ongoing' ? 'text-blue-500' :
                          'text-orange-500'
                        }`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

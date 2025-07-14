"use client";
import { MyBarChart, MyBarChartDataItem } from '@/components/organisation/MyBarChart';
import { MyBarList, MyBarListDataItem } from '@/components/organisation/MyBarList';
import MyDonutChart, { DataItem } from '@/components/organisation/MyDonutChart';
import { CarProps } from '@/utils/types/CarProps';
import { DriverProps } from '@/utils/types/DriverProps';
import { LocationProps } from '@/utils/types/LocationProps';
import { CarRental, Money, Person } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

interface StatCardProps {
    title: string,
    value: string,
    icon: React.ReactNode,
    className?: string
}

interface TitleProps {
    icon: React.ReactNode
    title: string
}

const Title = ({icon, title}: TitleProps) => {
    return (
        <h3 className='w-full whitespace-nowrap truncate text-ellipsis flex gap-2 border border-primary-blue/50 text-primary-blue p-2 rounded-xl justify-center mb-4'>
            {icon}
            {title}
        </h3>
    );
}

const StatCard = ({title, value, icon, className}: StatCardProps) => {
    return (
      <div className={`text-lg flex flex-col items-center bg-white rounded-lg text-primary-blue p-2 border-t-2 border-primary-blue hover:bg-primary-blue/5 ${className}`}>
        <Title icon={icon} title={title} />
        <p className='text-xl font-bold'>{value}</p>
      </div>  
    );
}

const Dashboard = () => {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);
    const [cars, setCars] = useState<CarProps[]>([]);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [availableCarsData, setAvailableCarsData] = useState<DataItem[]>([]);
    const [availableDriversData, setAvailableDriversData] = useState<DataItem[]>([]);

    useEffect(() => {
        const nbAvailableDrivers: number = drivers.filter((driver) => driver.available).length;
        setAvailableDriversData([
            {
                name: "Availaible drivers",
                amount: nbAvailableDrivers,
            },
            {
                name: "Unavailable drivers",
                amount: drivers.length - nbAvailableDrivers,
            },
        ]);
    }, [drivers, setAvailableDriversData]);

    useEffect(() => {
        const nbAvailableCars: number = cars.filter((car) => car.available).length;
        setAvailableCarsData([
            {
                name: "Availaible cars",
                amount: nbAvailableCars
            },
            {
                name: "Unavailable cars",
                amount: cars.length - nbAvailableCars
            },
        ]);
    }, [cars, setAvailableCarsData]);
    
    
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
                setCars(data.vehicles);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading vehicles:', error);
            });
    }, []);
        
    useEffect(() => {
        fetch('/data/drivers.json')
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            if (data && Array.isArray(data)) {
                setDrivers(data);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading drivers:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/data/locations.json')
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            if (data && Array.isArray(data)) {
                setLocations(data);
            } else {
                console.error('Unexpected data format:', data);
            }
            })
            .catch((error) => {
            console.error('Error loading locations:', error);
            });
    }, []);

    const carsData: MyBarListDataItem[] = Object.values(
        locations.reduce((acc: Record<number, MyBarListDataItem>, item) => {
        const vehicleId = item.vehicle.id;
        const car: CarProps | undefined = cars.find((car: CarProps) => car.id === vehicleId);
        const carName: string = car ? ( (car.brand ?? '') + ' ' + (car.model ?? '') ) : `Car ${vehicleId}`;
        const locationPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
        if (!acc[vehicleId]) {
            acc[vehicleId] = { id: item.id, name: carName, value: 0, amount: 0, href: `/cars/${vehicleId}` };
        }
        acc[vehicleId].value += 1;
        acc[vehicleId].amount += locationPrice;
        return acc;
        }, {})
    ).sort((a, b) => b.value - a.value).slice(0, 5);

    const driversData: MyBarListDataItem[] = Object.values(
        locations.reduce((acc: Record<number, MyBarListDataItem>, item) => {
        
        if (item.driver) {
            const driverId = item.driver.id;
            const driver: DriverProps | undefined = drivers.find((driver: DriverProps) => driver.id === driverId);
            const driverName: string = driver ? (driver.first_name ?? '' + driver.last_name ?? '') : `Driver ${driverId}`;
            const locationPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
            
            if (!acc[driverId]) {
                acc[driverId] = { id: item.id, name: driverName, value: 0, amount: 0, href: `/drivers/${driverId}` };
            }
            acc[driverId].value += 1;
            acc[driverId].amount += locationPrice;
        }

        return acc;
        }, {})
    ).sort((a, b) => b.value - a.value).slice(0, 5);

    const currentMonthIndex = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        .slice(0, currentMonthIndex + 1);

    const locationsDetailsData: MyBarChartDataItem[] = months.map((month) => ({
        date: month,
        carsLocAmount: 0,
        driversLocAmount: 0,
    }))

    if (locations.length > 0) {
        locations.forEach((item) => {
            const month = item.date.split(" ")[1];
            const monthIndex = months.indexOf(month.slice(0, 3));
            
            const locAmount = isNaN(Number(item.price)) ? 0 : Number(item.price);
        
            if (monthIndex !== -1) {
                locationsDetailsData[monthIndex][item.driver ? "driversLocAmount" : "carsLocAmount"] += locAmount;
            }
        });
    }

    const [totalLocGain, setTotalLocGain] = useState<number>(0);

    useEffect(() => {
        const newTotalLocGain = locationsDetailsData.reduce((total, { carsLocAmount, driversLocAmount }) => {
            return total + carsLocAmount + driversLocAmount;
        }, 0);

        setTotalLocGain(newTotalLocGain);
    }, [locationsDetailsData]);

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Your Statistics</h2>
                <p className="text-gray-600 text-sm mt-1">
                Here are some data about your agency!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                title="Total Cars" 
                value={`${cars.length}`} 
                icon={<CarRental style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                />
                <StatCard 
                title="Total Drivers" 
                value={`${drivers.length}`} 
                icon={<Person style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                />
                <StatCard 
                title="Location Gain" 
                value={`${totalLocGain.toLocaleString()} XAF`} 
                icon={<Money style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <Title 
                    icon={<Money style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                    title="Location Gain Details"
                />
                <div className="h-64">
                    <MyBarChart data={locationsDetailsData} />
                </div>
                </div>

                {/* Availability Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <Title
                    icon={
                    <div className="flex gap-2">
                        <CarRental style={{ color: '#005FFE', fontSize: '1.25rem' }} />
                        <Person style={{ color: '#005FFE', fontSize: '1.25rem' }} />
                    </div>
                    }
                    title="Cars and Drivers Availability"
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-between h-64">
                    <div className="w-full sm:w-1/2">
                    <MyDonutChart title="Cars" data={availableCarsData} defaultValue={cars.length} />
                    </div>
                    <div className="w-full sm:w-1/2">
                    <MyDonutChart title="Drivers" data={availableDriversData} defaultValue={drivers.length} />
                    </div>
                </div>
                </div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cars Performance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <Title 
                    icon={<CarRental style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                    title="Top Performing Cars"
                />
                <MyBarList data={carsData} />
                </div>

                {/* Drivers Performance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
                <Title 
                    icon={<Person style={{ color: '#005FFE', fontSize: '1.25rem' }} />} 
                    title="Top Performing Drivers"
                />
                <MyBarList data={driversData} />
                </div>
            </div>
            </div>
    );
};

export default Dashboard;

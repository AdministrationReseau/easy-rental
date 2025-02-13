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
};

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
        <div className='h-full w-[100%] flex flex-col gap-4 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your statistics</h2>
                    <div className='text-gray-600 text-sm'>
                        Here are some data about your agency !
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col gap-8'>
                <div className='grid grid-cols-2 xl:grid-cols-3 gap-8 w-4/5 mx-auto'>
                    <StatCard title='Total Cars' value={`${cars.length}`} icon={<CarRental style={ {color: '#005FFE'} }/>} />
                    <StatCard title='Total Drivers' value={`${drivers.length}`} icon={<Person style={ {color: '#005FFE'} }/>} />
                    <StatCard title='Location Gain' value={`${totalLocGain} XAF`} icon={<Money style={ {color: '#005FFE'} }/>} className='w-4/5 mx-auto col-span-2 xl:col-span-1'/>
                </div>
                <div className='flex flex-col xl:flex-row gap-8 w-full justify-around items-center xl:items-start'>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<Money style={ {color: '#005FFE'} }/>} title='Location Gain Details'/>
                        <MyBarChart data={locationsDetailsData} />
                    </div>
                    <div className="flex flex-col bg-white border-t-2 border-primary-blue p-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title
                            icon={<div>
                                <CarRental style={ {color: '#005FFE'} }/>
                                <Person style={ {color: '#005FFE'} }/>
                            </div>}
                            title='Cars and Drivers Details'
                        />
                        <div className='flex gap-16'>
                            <MyDonutChart title='Total Cars' data={availableCarsData} defaultValue={cars.length} />
                            <MyDonutChart title='Total Drivers' data={availableDriversData} defaultValue={drivers.length} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col xl:flex-row gap-8 w-11/12 mx-auto justify-around items-center xl:items-start'>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<CarRental style={ {color: '#005FFE'} }/>} title='Cars Location Details'/>
                        <MyBarList data={carsData}/>
                    </div>
                    <div className="w-4/5 xl:w-3/5 bg-white border-t-2 border-primary-blue py-4 px-8 rounded-lg hover:bg-primary-blue/5">
                        <Title icon={<Person style={ {color: '#005FFE'} }/>} title='Drivers Location Details'/>
                        <MyBarList data={driversData}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

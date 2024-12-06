'use client'

import {
    Delete,
    Edit,
    RemoveRedEye
} from '@mui/icons-material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ResourceEditForm from './ResourceEditForm';

export interface Vehicle {
    id: number;
    type: string;
    brand: string;
    model: string;
    year: number;
    passenger: number;
    pricePerDay: number;
    vin: string;
    engine: {
        type: string;
        horsepower: number;
        capacity: number;
    };
    transmission: string;
    color: string;
    fuel_efficiency: {
        city: number;
        highway: number;
    };
    license_plate: string;
    registration: {
        state: string;
        expiry: string;
    };
    owner: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    service_history: {
        date: string;
        service_type: string;
        mileage: number;
        provider: string;
    }[];
    insurance: {
        provider: string;
        policy_number: string;
        expiry: string;
    };
    images: string[];
}
  
export interface Driver {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    license_number: string;
    license_type: string;
    address: string;
    phone: string;
    email: string;
    vehicle_assigned: {
        id: number;
        make: string;
        model: string;
        year: number;
    };
    rating: number;
    insurance_provider: string;
    insurance_policy: string;
    profile_picture: string;
}

interface ResourceCardProps {
    resource: Driver | Vehicle,
    openEditForm: (resourceId: number) => void,
    profilActive: boolean,
}

export const ResourceCard = ({resource, openEditForm, profilActive = false}: ResourceCardProps) => {
    const isVehicle: boolean = 'brand' in resource;
    const vehicleResource = resource as Vehicle;
    const driverResource = resource as Driver;

    const imgPath = isVehicle
        ? vehicleResource.images[0]
        : driverResource.profile_picture; 
  
    const title = isVehicle
    ? `${vehicleResource.license_plate} | ${vehicleResource.brand} ${vehicleResource.model} (${vehicleResource.year})`
    : `${driverResource.first_name} ${driverResource.last_name.toUpperCase()} | License No: ${driverResource.license_number}`;

    const content = isVehicle
        ? `${vehicleResource.passenger} passengers - capacity: ${vehicleResource.engine.capacity} L`
        : `${driverResource.age} years old - ${driverResource.email}`;

    const asideContents = isVehicle
        ? [
            `${vehicleResource.pricePerDay} FCFA (per day)`,
            `${vehicleResource.fuel_efficiency.city} L/100Km (city)`,
            `${vehicleResource.fuel_efficiency.highway} L/100Km (highway)`,
        ]
        : [
            `${driverResource.rating} / 5 (rating)`,
            `${driverResource.insurance_provider} (Insurance)`,
        ];

    return (
        <div className='bg-white rounded-md p-1 px-2 flex flex-row items-center gap-2 w-11/12 h-32 m-2 mx-auto border border-primary-blue/15 hover:border-primary-blue/15 hover:shadow-sm'>
            <div className='relative w-64 h-4/5 border border-black/5 rounded-md'>
                <Image 
                    src={imgPath}
                    alt="Car" 
                    fill 
                    style={{ objectFit: 'contain' }} 
                />
            </div>
            
            <div className='w-1 h-3/5 mx-1 bg-primary-blue/20'></div>
            
            <div className='grid grid-cols-[2fr_1fr] gap-2 w-full items-center'>
                <div className='flex flex-col pl-4'>
                    <h2 className='font-bold text-xl'>{title}</h2>
                    {!profilActive &&
                        <p className='text-xm'>{content}</p>
                    }
                </div>

                {!profilActive &&
                    <div className='flex flex-col gap-0 mx-2'>
                        {
                            asideContents.map((asideContent, index) => (
                                <div key={index} className='text-nowrap text-base text-gray-700'>{asideContent}</div>
                            ))
                        }
                    </div>
                }
            </div>
            
            <div className='w-1 h-3/5 mx-1 bg-primary-blue/20'></div>

            <div className={`flex ${profilActive ? 'flex-row' : 'flex-col'} gap-1 pr-1`}>
                <RemoveRedEye sx={{ color: 'blue' }} onClick={() => {}} />
                <Edit sx={{ color: 'blue' }} onClick={() => openEditForm(resource.id)} />
                <Delete sx={{ color: 'blue' }} />
            </div>

        </div>
    );
}

export default function VehiclesPage() {
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [formModalResource, setFormModalResource] = useState<Vehicle | null>(null);

    const closeEditForm = () => {
        setFormModalResource(null);
        setIsEditFormOpen(false);
    }

    const openEditForm = (resourceId: number) => {
        setFormModalResource(vehicles.find((vehicle) => vehicle.id === resourceId) || null);
        setIsEditFormOpen(true);
    }

    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {
            id: 1,
            type: "Car",
            brand: "Toyota",
            model: "Camry",
            year: 2020,
            passenger: 2,
            pricePerDay: 2500,
            vin: "1HGBH41JXMN109186",
            engine: {
                type: "Gasoline",
                horsepower: 203,
                capacity: 2.5
            },
            transmission: "Automatic",
            color: "Blue",
            fuel_efficiency: {
                city: 28,
                highway: 39
            },
            license_plate: "ABC1234",
            registration: {
                state: "California",
                expiry: "2025-08-01"
            },
            owner: {
                name: "John Doe",
                address: "123 Main St, City, CA 90001",
                phone: "+1 123-456-7890",
                email: "john.doe@example.com"
            },
            service_history: [
                {
                    date: "2022-01-10",
                    service_type: "Oil Change",
                    mileage: 15000,
                    provider: "Quick Lube"
                },
                {
                    date: "2023-06-22",
                    service_type: "Brake Inspection",
                    mileage: 25000,
                    provider: "Brake Masters"
                }
            ],
            insurance: {
                provider: "State Farm",
                policy_number: "SF123456789",
                expiry: "2024-07-15"
            },
            images: [
                "/assets/organisation/cars/camry.jpeg",
                "/assets/organisation/cars/camry.jpeg",
                "/assets/organisation/cars/camry.jpeg"
            ]
        },
        {
            id: 2,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
        {
            id: 3,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
        {
            id: 4,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
        {
            id: 5,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
        {
            id: 6,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
        {
            id: 7,
            type: "Motorcycle",
            brand: "Harley-Davidson",
            model: "Sportster",
            year: 2021,
            passenger: 2,
            pricePerDay: 5000,
            vin: "1HD1BJY14GB123456",
            engine: {
                type: "Gasoline",
                horsepower: 120,
                capacity: 1.2
            },
            transmission: "Manual",
            color: "Black",
            fuel_efficiency: {
                city: 50,
                highway: 65
            },
            license_plate: "XYZ9876",
            registration: {
                state: "Florida",
                expiry: "2025-09-01"
            },
            owner: {
                name: "Jane Smith",
                address: "456 Park Ave, Miami, FL 33101",
                phone: "+1 987-654-3210",
                email: "jane.smith@example.com"
            },
            service_history: [
                {
                    date: "2022-03-15",
                    service_type: "Tire Replacement",
                    mileage: 5000,
                    provider: "Harley Service Center"
                },
                {
                    date: "2023-08-30",
                    service_type: "Chain Lubrication",
                    mileage: 15000,
                    provider: "Motorcycle Repair Co."
                }
            ],
            insurance: {
                provider: "Allstate",
                policy_number: "AL987654321",
                expiry: "2024-08-20"
            },
            images: [
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg",
                "/assets/organisation/cars/sportster.jpeg"
            ]
        },
    ]);

    const [drivers, setDrivers] = useState<Driver[]>([
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            age: 35,
            license_number: "D1234567",
            license_type: "Class C",
            address: "123 Main St, City, CA 90001",
            phone: "+1 123-456-7890",
            email: "john.doe@example.com",
            vehicle_assigned: {
                id: 1,
                make: "Toyota",
                model: "Camry",
                year: 2020
            },
            rating: 4.5,
            insurance_provider: "State Farm",
            insurance_policy: "SF123456789",
            profile_picture: "/assets/organisation/cars/1.jpeg"
        },
        {
            id: 2,
            first_name: "Jane",
            last_name: "Smith",
            age: 28,
            license_number: "S7654321",
            license_type: "Class M",
            address: "456 Park Ave, Miami, FL 33101",
            phone: "+1 987-654-3210",
            email: "jane.smith@example.com",
            vehicle_assigned: {
                id: 2,
                make: "Harley-Davidson",
                model: "Sportster",
                year: 2021
            },
            rating: 4.8,
            insurance_provider: "Allstate",
            insurance_policy: "AL987654321",
            profile_picture: "/assets/organisation/cars/2.jpeg"
        }
    ]);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handleDelete = (id: number) => {
        setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
        setShowAlert(true);
    };

    return (
        <div className='h-full w-full p-4 flex flex-col gap-2 bg-primary-blue/5 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Your vehicles</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{vehicles.length} vehicles</span>
                    </div>
                </div>
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            <div className='h-full flex flex-row gap-0'>
                <div className='w-1/5 h-full flex items-center justify-center bg-red border border-black'>
                    FILTER
                </div>
                <div className='w-full h-full overflow-auto'>
                    {vehicles.map((vehicle, _) => (
                        <ResourceCard key={vehicle.id} resource={vehicle} openEditForm={openEditForm} profilActive={false} />
                    ))}
                </div>
            </div>
            <ResourceEditForm isOpen={isEditFormOpen} resource={formModalResource} onClose={closeEditForm} onSave={null} />
        </div>
    );
}


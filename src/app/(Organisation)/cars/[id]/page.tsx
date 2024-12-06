'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Vehicle, Driver, Resource } from '../ResourceEditForm';
import { ResourceCard } from '../page';

interface ResourceProfilContentProps {
    resource: Resource,
}

const ResourceProfilContent = ({ resource }: ResourceProfilContentProps) => {
    const isVehicle: boolean = 'brand' in resource;
    const vehicleResource = resource as Vehicle;
    const driverResource = resource as Driver;
    let details: { title: string, content: string | object, option: { title: string, content: string }[] }[] = [];

    let entries = Object.entries(isVehicle ? vehicleResource : driverResource).slice(1);
    entries = entries.filter(entry => !Array.isArray(entry[1]));
    console.log(entries);

    entries.map((entry: [string, any]) => {
        let title: string = entry[0];
        let content: string | object = entry[1];

        let detail: { title: string, content: string | object, option: { title: string, content: string }[] } = {
            title: title,
            content: content,
            option: []
        };

        if (typeof content === 'object') {
            let subEntries = Object.entries(content);
            subEntries.map((subEntry: [string, any]) => {
                let title: string = subEntry[0];
                let content: string = subEntry[1];

                detail.option.push({
                    title: title,
                    content: content,
                })
            })
        }

        details.push(detail);
    })

    const entriesLength = details.length;
    const entriesFirstPart = details.slice(0, entriesLength / 2);
    const entriesSecondPart = details.slice(entriesLength / 2);
    const entriesParts = [details];

    return (
        <div className='h-full w-full p-4 flex flex-col gap-2 bg-primary-blue/5 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Vehicle overview</h2>
                    <div className='text-gray-600 text-sm'>
                        You have this vehicle since <span className='font-bold'>{ new Date().getFullYear() }</span>
                    </div>
                </div>
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            
            <ResourceCard resource={resource} openEditForm={() => {}} profilActive={true} />
            
            <div className='mx-auto w-4/5 h-full flex flex-row gap-2'>                
                <div className='w-1/2 h-2/3 overflow-y-scroll flex flex-col gap-2 px-4 pt-2 bg-white rounded-md p-1 border border-primary-blue/15 hover:border-primary-blue/15 hover:shadow-sm'>
                    <h2 className='font-bold text-xl text-center pb-2 pl-4 mb-2'>Caracteristics</h2>
                    
                    {details.map((entry, index) => {
                        const isSubList = typeof entry.content === 'object';

                        return (
                            <div key={index} className='border-b border-gray-200'>
                                <span className='font-semibold'>{getResourceFieldLabel(entry.title)}{!isSubList ? ':': ''} </span>
                                {!isSubList &&
                                    <span className='text-gray-600'>{entry.content as string}</span>
                                }
                                {isSubList &&
                                    <div>
                                        {entry.option.map((subEntry, subIndex) => (
                                            <div key={subIndex} className='ml-8'>
                                                <span className='font-semibold'>{getResourceFieldLabel(subEntry.title)}{!isSubList ? ':': ''} </span>
                                                <span className='text-gray-600'>{subEntry.content as string}</span>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        );
                    })}        
                </div>
                <div className='w-1/2 h-2/3 flex flex-col gap-2 px-4 pt-2 bg-white rounded-md p-1 border border-primary-blue/15 hover:border-primary-blue/15 hover:shadow-sm'>
                    <h2 className='font-bold text-xl text-center pb-2 pl-4 mb-2'>Services history</h2>
                    {/* {isVehicle &&
                        {
                            const serviceHistory = vehicleResource.service_history;

                            return (<></>);
                        }
                    } */}
                </div>
            </div>
        </div>
    );
}

const getResourceFieldLabel = (fieldName: string): string =>
    fieldName
        .replace(/\./g, " ") // Replace dots with spaces
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
        .replace(/_/g, " ") // Replace underscores with spaces
        .toUpperCase()

export default function ResourceProfilPage() {
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

    const { id } = useParams<{ id: string}>();
    const vehicleId = Number(id);

    if (isNaN(vehicleId)) {
        return <div>Invalid vehicle ID</div>
    }

    const requestedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);

    if (!requestedVehicle) {
        return <div>Invalid vehicle ID</div>
    }

    return <ResourceProfilContent resource={requestedVehicle} />
}
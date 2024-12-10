'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Vehicle, Driver, Resource } from '../../../../components/ResourceEditForm';
import { ResourceCard } from '@/components/ResourceCard';

interface ResourceProfilContentProps {
    resource: Resource,
}

const ResourceProfilContent = ({ resource }: ResourceProfilContentProps) => {
    const isVehicle: boolean = 'brand' in resource;
    const vehicleResource = resource as Vehicle;
    const driverResource = resource as Driver;
    const details: { title: string, content: string | object, option: { title: string, content: string }[] }[] = [];

    let entries = Object.entries(isVehicle ? vehicleResource : driverResource).slice(1);
    entries = entries.filter(entry => !Array.isArray(entry[1]));
    console.log(entries);

    entries.map((entry: [string, string | object]) => {
        const title: string = entry[0];
        const content: string | object = entry[1];

        const detail: { title: string, content: string | object, option: { title: string, content: string }[] } = {
            title: title,
            content: content,
            option: []
        };

        if (typeof content === 'object') {
            const subEntries = Object.entries(content);
            subEntries.map((subEntry: [string, string]) => {
                const title: string = subEntry[0];
                const content: string = subEntry[1];

                detail.option.push({
                    title: title,
                    content: content,
                })
            })
        }

        details.push(detail);
    })

    return (
        <div className='h-full w-full p-4 flex flex-col gap-2 bg-primary-blue/5 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Drivers overview</h2>
                    <div className='text-gray-600 text-sm'>
                        You have this driver since <span className='font-bold'>{ new Date().getFullYear() }</span>
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
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
        try {
            const response = await fetch("/data/drivers.json");
            if (!response.ok) {
            throw new Error("Failed to fetch drivers");
            }
            const data: Driver[] = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
        };

        fetchDrivers();
    }, []);

    const { id } = useParams<{ id: string}>();
    const driverId = Number(id);

    if (isNaN(driverId)) {
        return <div>Invalid vehicle ID</div>
    }

    const requestedDriver = drivers.find(driver => driver.id === driverId);

    if (!requestedDriver) {
        return <div>Invalid driver ID</div>
    }

    return <ResourceProfilContent resource={requestedDriver} />
}
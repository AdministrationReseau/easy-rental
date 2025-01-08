'use client'

import { useState, useEffect } from 'react';
import ResourceEditForm from '@/components/ResourceEditForm';
import { Driver } from '@/utils/types/resources';
import { ResourceCard } from '@/components/ResourceCard';

export default function DriversPage() {
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [formModalResource, setFormModalResource] = useState<Driver | null>(null);

    const closeEditForm = () => {
        setFormModalResource(null);
        setIsEditFormOpen(false);
    }

    // 

    const [drivers, setDrivers] = useState<Driver[]>([]);
    // const openEditForm = (resourceId: number) => {
    //     setFormModalResource(drivers.find((driver) => driver.id === resourceId) || null);
    //     setIsEditFormOpen(true);
    // }
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

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    // const handleDelete = (id: number) => {
    //     setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    //     setShowAlert(true);
    // };

    return (
        <div className='h-full w-full p-4 flex flex-col gap-2 bg-primary-blue/5 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Your drivers</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{drivers.length} drivers</span>
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
                    {drivers.map((driver) => (
                        <ResourceCard key={driver.id} resource={driver} profilActive={false} />
                    ))}
                </div>
            </div>
            {formModalResource && isEditFormOpen &&
                <ResourceEditForm resource={formModalResource} onClose={closeEditForm} />
            }

        </div>
    );
}

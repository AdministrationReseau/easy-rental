'use client'

import { useState, useEffect } from 'react';
import ResourceEditForm from '../../../components/ResourceEditForm';
import { Vehicle } from '@/utils/types/resources';
import { ResourceCard } from '@/components/ResourceCard';

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

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
        try {
            const response = await fetch("/data/car.json");
            if (!response.ok) {
            throw new Error("Failed to fetch vehicles");
            }
            const data: Vehicle[] = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
        };

        fetchVehicles();
    }, []);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    // const handleDelete = (id: number) => {
    //     setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
    //     setShowAlert(true);
    // };

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
                    {vehicles.map((vehicle) => (
                        <ResourceCard key={vehicle.id} resource={vehicle} openEditForm={openEditForm} profilActive={false} />
                    ))}
                </div>
            </div>

            { formModalResource && isEditFormOpen &&
                <ResourceEditForm resource={formModalResource} onClose={closeEditForm} />   
            }
        </div>
    );
}


"use client";
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import { RentalSummaryOrg } from '@/components/organisation/RentalSummaryOrg';
import { LocationProps } from '@/utils/types/RentalInfoProps';
import { DriverProps } from '@/utils/types/DriverProps';


const Renting = () => {
        const [location, setLocation] = useState<LocationProps>();
        const { id } = useParams(); // Récupération de l'ID via Next.js
        const [vehicle, setVehicle] = useState<CarProps| null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        const [driver, setDriver] = useState<DriverProps| null>(null);
    
        
    // Chargement des données de location
    useEffect(() => {
            const fetchLocations = async () => {
                try {
                    const response = await fetch("/data/location.json");
                    // console.log(response)
                    if (!response.ok) {
                        throw new Error("Failed to fetch locations");
                    }
                    const data = await response.json();
                    const foundLocation = data.find(
                        (l: LocationProps) => l.id.toString() === id
                    );
                    setLocation(foundLocation|| null);
                    
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };
            fetchLocations();
        }, [id]);

        
    // Chargement des données du véhicules
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
                    const foundVehicle = data.vehicles.find(
                        (v: CarProps) => v.id === location?.vehicle.vehicle_id
                    );
                    setVehicle(foundVehicle || null); // Trouve le véhicule correspondant à l'ID
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, [location?.vehicle.vehicle_id]);

    // Chargement des données du chauffeur
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
                    const foundDriver = data.find(
                        (d: DriverProps) => d.id === location?.driver.driver_id                    );
                    setDriver(foundDriver || null); // Trouve le véhicule correspondant à l'ID
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, [location?.driver.driver_id]);
    
    
        if (!vehicle) {
            return (
                <div className="p-6">
                    <p>Vehicle not found!</p>
                </div>
            );
        }
        if (loading) return <p>Loading ...</p>
        if (error) return <p>Error: {error}</p>

    return (
        <div>
            <p className='text-xl font-semi-blod'>Location request since : {location?.date}</p>
            
            <aside className="w-full  p-4 m-auto">
                <RentalSummaryOrg
                    location={location}
                    driver={driver}
                    vehicle={vehicle}
                /> 
            </aside>
            <div className='w-full text-center '>
               <button className='w-[60%] p-4 m-auto rounded-md text-white bg-secondary-blue hover:bg-primary-blue hover:m-2 text-2xl'>
                    Validate the rent
                </button>  
            </div>
           

        </div>
    );
};

export default Renting;

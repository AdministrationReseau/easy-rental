"use client";
import React, {useEffect, useState} from 'react';
import { LocationProps } from '@/utils/types/RentalInfoProps';
import LocationListProfile from '@/components/LocationListProfile';

const Location = () => {

    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/data/locations.json");
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await response.json();
                console.log(data)
                setLocations(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <main>
                <div className="mt-[20px]">
                    <LocationListProfile locations={locations} />
                </div>
            </main>
        </div>
    );
};

export default Location;

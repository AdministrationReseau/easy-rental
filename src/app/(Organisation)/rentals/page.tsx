"use client";
import React, {useEffect, useState} from 'react';
import LocationList from "@/components/LocationList";

interface Location1 {
    id: string;
    name: string;
    type: string;
    date: string;
    price: string;
    image: string;
}

const Location = () => {

    const [locations, setLocations] = useState<Location1[]>([]);
    // const [recentLocations, setRecentLocations] = useState<Location1[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/data/locations.json");
                // console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await response.json();
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
                <div className='ml-[25px] mt-[20px]'>
                    <h2 className='text-xl font-semibold mb-4 text-primary-text'>
                    Renting Request</h2>
                    <LocationList locations={[locations[0]]} />
                </div>
                <div className="ml-[25px] mt-[20px]">
                    <h2 className="text-xl font-semibold mb-4 text-primary-text">Recent Locations</h2>
                    <LocationList locations={locations} />
                </div>
            </main>
        </div>
    );
};

export default Location;

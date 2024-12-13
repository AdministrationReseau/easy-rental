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
            <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                <div className="ml-[25px] mt-[20px]">
                    <LocationList locations={locations} />
                </div>
            </main>
        </div>
    );
};

export default Location;

'use client'
import LocationFilter from "@/components/LocationFilter";
import React, {useEffect, useState} from "react";
import VehicleList from "@/components/customer/VehicleList";
import {CarProps, FilterVehicleProps} from "@/utils/types/CarProps";
import HalfAddContent from "@/components/base-component/HalfAddContent";


export default function Home() {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [filters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
    });


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
                    setVehicles(data.vehicles);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, []);

    return (
        <>
            <main className="bg-var(--background)">
                <div className="w-[85%] flex justify-between my-12 mx-auto flex-row">
                    <HalfAddContent
                        title="The Best Platform for Car Rental"
                        description="Ease of doing a car rental safely and reliably. Of course at a low price."
                        buttonText="Explore Agencies"
                        buttonLink="/customer/agencies"
                        backgroundImage="/Ads 1.png" // Replace with your image path
                    />

                    {/* Second HalfAdd */}
                    <HalfAddContent
                        title="Affordable Luxury Cars for Rent"
                        description="Drive the car of your dreams at an affordable price with top-notch service."
                        buttonText="Explore Cars"
                        buttonLink="/customer/cars"
                        backgroundImage="/Ads 2.png"
                        buttonColor = "bg-secondary-blue"
                    />
                </div>


                <div className="flex justify-center items-center flex-col">
                    <LocationFilter/>
                    <div className="justify-center my-12">
                        <VehicleList
                            vehicles={vehicles.slice(0, 4)}
                            filters={filters}
                            // Pass down the function
                        />

                        <VehicleList
                            vehicles={vehicles.slice(0, 4)}
                            filters={filters}
                            // Pass down the function
                        />

                        <VehicleList
                            vehicles={vehicles.slice(0, 4)}
                            filters={filters}
                            // Pass down the function
                        />
                    </div>
                </div>

            </main>
        </>
    );
}

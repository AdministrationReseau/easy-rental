'use client'
import LocationFilter from "@/components/LocationFilter";
import React, {useEffect, useState} from "react";
import VehicleList from "@/components/customer/VehicleList";
import {CarProps, FilterVehicleProps} from "@/utils/types/CarProps";
import HalfAddContent from "@/components/base-component/HalfAddContent";
import AgencyList from "@/components/customer/AgencyList";
import {AgencyProps, FilterAgencyProps} from "@/utils/types/AgencyProps";
import Link from "next/link";


export default function Home() {
    const [agencies, setAgencies] = useState<AgencyProps[]>([]);
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [filters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
    });
    const [filtersA] = useState<FilterAgencyProps>({
        city: [],
        rating: null,
        type: [],
        status: 'all',
        followers: [0, 100],
    });

    useEffect(() => {
        fetch('/data/agencies.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setAgencies(data);
                } else {
                    console.error('Unexpected data format:', data);
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error('Error loading Agencies:', error);
            });
    }, []);

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
                <div className="w-[85%] my-12 mx-auto md:justify-between flex flex-col md:flex-row">
                    <HalfAddContent
                        title="The Best Platform for Car Rental"
                        description="Ease of doing a car rental safely and reliably. Of course at a low price."
                        buttonText="Explore Agencies"
                        buttonLink="/customer/agencies"
                        backgroundImage="/Ads 1.png"
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


                <div className="w-full flex justify-center items-center flex-col">
                    <LocationFilter/>

                    <div>
                        <div className="mx-5 flex flex-col justify-center items-center mt-10">
                            <h2 className="text-3xl font-semibold text-gray-800">Agencies</h2>
                            <h3 className="font-light text-lg text-secondary-text text-centeritems-center">
                                Find the best agencies to meet your needs
                            </h3>

                        </div>
                        <div className="w-full flex flex-row justify-center mb-12">
                            <AgencyList agencies={agencies.slice(0, 6)} filters={filtersA}/>
                        </div>

                        <Link
                            href="/customer/agencies"
                            className={`flex justify-center m-auto bg-primary-blue text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition w-[230px]`}
                        >
                            Explore more agencies
                        </Link>

                        <div className="flex flex-col justify-center items-center mt-10">
                            <h2 className="text-3xl font-semibold text-gray-800">Cars</h2>
                            <h3 className="font-light text-lg text-secondary-text text-centeritems-center">
                                Explore our top vehicle options
                            </h3>
                        </div>

                        <div className="w-full flex flex-row justify-center my-12">
                            <VehicleList vehicles={vehicles.slice(0, 6)} filters={filters}/>
                        </div>

                        <Link
                            href="/customer/cars"
                            className={`flex justify-center m-auto mb-5 bg-primary-blue text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition w-[200px]`}
                        >
                            View more cars
                        </Link>
                    </div>

                </div>

            </main>
        </>
    );
}

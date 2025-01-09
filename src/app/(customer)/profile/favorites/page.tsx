"use client";
import { CarCard } from '@/components/CarCard';
import CarDetail from '@/components/combiner-components/CarDetail';
import VehicleList from '@/components/customer/VehicleList';
import LocationFilter from '@/components/LocationFilter';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import React, { useEffect, useState } from 'react';

const Favorite: React.FC = () => {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [likedVehicles, setLikedVehicles] = useState<CarProps[]>([]);
    const [selectedVehicle] = useState<CarProps | null>(null);

    useEffect(() => {
        fetch('/data/favorite.json')
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

    

    // Ajouter un véhicule aux favoris
    const handleLike = (id: number) => {
        const likedVehicle = vehicles.find((vehicle) => vehicle.id === id);
        if (likedVehicle && !likedVehicles.some((v) => v.id === id)) {
            setLikedVehicles((prev) => [...prev, likedVehicle]);
        }
    };

    // Retirer un véhicule des favoris
    const handleDislike = (id: number) => {
        setLikedVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
    };

    return (
        <div>
            <main className="flex flex-row m-2">
                <div>
                    {/* Display CarDetail if a vehicle is selected */}
                    {selectedVehicle && (
                        <div className="mb-4">
                            <CarDetail vehicle={selectedVehicle} />
                        </div>
                    )}
                    <div className="flex">
                        <div className="w-full flex flex-row flex-wrap gap-4">
                            {/* <LocationFilter /> */}
                            {vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <CarCard
                                                key={vehicle.id}
                                                id={vehicle.id}
                                                images={vehicle.images}
                                                brand={vehicle.brand}
                                                rating={vehicle.rating}
                                                reviews={vehicle.reviews}
                                                model={vehicle.model}
                                                transmission={vehicle.transmission}
                                                engine={vehicle.engine}
                                                passenger={vehicle.passenger || 4}
                                                pricePerDay={vehicle.pricePerDay}
                                                type={vehicle.type} 
                                                year={vehicle.year} 
                                                description ={vehicle.description} 
                                                vin={vehicle.vin} 
                                                fonctionnalities={vehicle.fonctionnalities}
                                                color={vehicle.color} 
                                                fuel_efficiency={vehicle.fuel_efficiency} 
                                                license_plate={vehicle.license_plate} 
                                                registration={vehicle.registration} 
                                                owner={vehicle.owner} 
                                                service_history={vehicle.service_history} 
                                                insurance={vehicle.insurance} 
                                                favorite={vehicle.favorite}
                                                onLike={() => {}} // Fonction vide
                                                onDislike={() => {}} // Fonction vide
                                                />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    No vehicles available in your favorites.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Favorite;

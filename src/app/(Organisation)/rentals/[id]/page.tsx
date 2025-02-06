"use client";
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import { RentalSummaryOrg } from '@/components/organisation/RentalSummaryOrg';

interface Location1 {
    id: string;
    name: string;
    type: string;
    date: string;
    price: string;
    image: string;
}
const Renting = () => {
        const [location, setLocation] = useState<Location1>();
        const { id } = useParams(); // Récupération de l'ID via Next.js
        const [vehicle, setVehicle] = useState<CarProps| null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
    
    // Chargement des données des véhicules
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
                            (v: CarProps) => v.id.toString() === id
                        );
                        setVehicle(foundVehicle || null); // Trouve le véhicule correspondant à l'ID
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                })
                .catch((error) => {
                    console.error('Error loading vehicles:', error);
                });
        }, [id]);
    
        
    // Chargement des données des véhicules
    useEffect(() => {
            const fetchLocations = async () => {
                try {
                    const response = await fetch("/data/locations.json");
                    // console.log(response)
                    if (!response.ok) {
                        throw new Error("Failed to fetch locations");
                    }
                    const data = await response.json();
                    const foundLocation = data.find(
                        (l: Location1) => l.id.toString() === id
                    );
                    setLocation(foundLocation|| null);
                    
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };
            fetchLocations();
        }, []);
    
    
        if (!vehicle) {
            return (
                <div className="p-6">
                    <p>Vehicle not found!</p>
                </div>
            );
        }
        if (loading) return <p>Loading ...</p>
        if (error) return <p>Error: {error}</p>

        // État pour stocker les informations saisies
            const rentalInfo= {
                pickUpDate: '',
                pickUpTime: '',
                pickUpPlace: '',
                backOffDate: '',
                backOffTime: '',
                backOffPlace: '',
                billingName: '',
                billingPhone: '',
                billingAddress: '',
                billingCity: '',
                promoCode: '',
                paymentMethod:'',
                driverName:'',
            };
    return (
        <div>
            <p className='text-xl font-semi-blod'>Location request since : {location?.date}</p>
            
            <aside className="w-full  p-4 m-auto">
                <RentalSummaryOrg
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
                    favorite = {vehicle.favorite}
                    onLike={function (id: number): void {console.log(id)}} 
                    onDislike={function (id: number): void {console.log(id)} }
                    rentalInfo={rentalInfo} // Passer l'état dynamique
                                    />
                     
            </aside>

        </div>
    );
};

export default Renting;

"use client";
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import { RentalSummary } from '@/components/customer/RentalSummary';
import { RentalSummaryOrg } from '@/components/organisation/RentalSummaryOrg';

const Renting = () => {

        const { id } = useParams(); // Récupération de l'ID via Next.js
        const [vehicle, setVehicle] = useState<CarProps| null>(null);
        const [vehicles, setVehicles] = useState<CarProps[]>([]);
        console.log(vehicles);
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
                        setVehicles(data.vehicles);
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
    
    
        if (!vehicle) {
            return (
                <div className="p-6">
                    <p>Vehicle not found!</p>
                </div>
            );
        }
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

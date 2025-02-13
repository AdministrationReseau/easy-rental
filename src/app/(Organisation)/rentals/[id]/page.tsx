// "use client";
// import React, { useState } from 'react';
// import {
//     MapIcon,
//     UserIcon,
//     CarIcon,
//     CalendarIcon,
//     CreditCardIcon,
//     ClockIcon,
//     PhoneIcon,
//     KeyIcon,
//     AlertCircleIcon
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const LocationDetails = () => {
//     const [activeTab, setActiveTab] = useState('info');

//     const location = {
//         vehicle: {
//             name: "Mercedes Classe S",
//             image: "/api/placeholder/400/200",
//             plateNumber: "AB-123-CD",
//             year: "2024",
//             color: "Noir",
//             features: ["GPS", "Climatisation", "Sièges cuir", "Bluetooth"],
//             documents: ["Assurance", "Carte grise", "Contrôle technique"]
//         },
//         driver: {
//             name: "Jean Dupont",
//             phone: "+33 6 12 34 56 78",
//             license: "12345678",
//             image: "/api/placeholder/100/100",
//             rating: 4.8,
//             experience: "5 ans"
//         },
//         client: {
//             name: "Marie Martin",
//             phone: "+33 6 98 76 54 32",
//             email: "marie.martin@email.com",
//             preference: "VIP"
//         },
//         rental: {
//             startDate: "2024-02-07T10:00:00",
//             endDate: "2024-02-08T18:00:00",
//             amount: 450,
//             status: "En cours",
//             paymentStatus: "Payé",
//             pickupLocation: "44 Rue de la Paix, Paris",
//             dropoffLocation: "15 Avenue des Champs-Élysées, Paris"
//         }
//     };

//     const RatingStars = ({ rating }: { rating: number }) => (
//         <div className="flex items-center space-x-1">
//             {[...Array(5)].map((_, i) => (
//                 <svg
//                     key={i}
//                     className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//             ))}
//             <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
//             <div className="max-w-7xl mx-auto space-y-6">
//                 <div
//                     className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-3xl mx-auto">
//                     <div className="flex flex-wrap justify-between items-center gap-4">
//                         <div className="w-full sm:w-auto">
//                             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//                                 Détails de la Location
//                             </h1>
//                             <p className="text-gray-500 mt-1 text-sm sm:text-base">
//                                 Réf: #LOC-2024-0207
//                             </p>
//                         </div>
//                         <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
//                             <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm sm:text-base">
//                                 {location.rental.status}
//                             </span>
//                             <span className="mt-2 text-xs sm:text-sm text-gray-500">
//                                 {location.rental.paymentStatus}
//                             </span>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-white rounded-xl p-4 shadow-sm">
//                             <div className="flex space-x-4 border-b">
//                                 {['info', 'documents', 'trajet'].map((tab) => (
//                                     <button
//                                         key={tab}
//                                         onClick={() => setActiveTab(tab)}
//                                         className={`pb-2 px-4 transition-colors duration-200 ${
//                                             activeTab === tab
//                                                 ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
//                                                 : 'text-gray-500 hover:text-gray-700'
//                                         }`}
//                                     >
//                                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {activeTab === 'info' && (
//                             <Card className="hover:shadow-lg transition-shadow duration-300">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <CarIcon className="h-5 w-5 text-blue-500"/>
//                                         Véhicule
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-6">
//                                         <div className="relative group">
//                                             <img
//                                                 src={location.vehicle.image}
//                                                 alt={location.vehicle.name}
//                                                 className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
//                                             />
//                                             <div
//                                                 className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
//                                                 <div className="p-4 text-white">
//                                                     <h3 className="font-bold">{location.vehicle.name}</h3>
//                                                     <p>{location.vehicle.year} - {location.vehicle.color}</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:items-center">
//                                             {location.vehicle.features.map((feature, index) => (
//                                                 <div key={index}
//                                                      className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200 sm:text-center">
//                                                     <p className="text-sm font-medium text-gray-700">{feature}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )}

//                         {activeTab === 'documents' && (
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Documents du véhicule</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         {location.vehicle.documents.map((doc, index) => (
//                                             <div key={index}
//                                                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                                                 <div className="flex items-center space-x-3">
//                                                     <KeyIcon className="h-5 w-5 text-gray-500"/>
//                                                     <span>{doc}</span>
//                                                 </div>
//                                                 <button className="text-blue-500 hover:text-blue-600">
//                                                     Voir
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )}

//                         {activeTab === 'trajet' && (
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <MapIcon className="h-5 w-5 text-blue-500"/>
//                                         Trajet
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div
//                                             className="bg-gray-100 w-full h-64 rounded-lg flex items-center justify-center">
//                                             <p className="text-gray-500">Carte du trajet</p>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                             <div className="p-4 bg-green-50 rounded-lg">
//                                                 <p className="text-sm text-gray-500">Départ</p>
//                                                 <p className="font-medium">{location.rental.pickupLocation}</p>
//                                             </div>
//                                             <div className="p-4 bg-red-50 rounded-lg">
//                                                 <p className="text-sm text-gray-500">Arrivée</p>
//                                                 <p className="font-medium">{location.rental.dropoffLocation}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>

//                     {/* Colonne latérale */}
//                     <div className="space-y-6">
//                         {/* Informations de location */}
//                         <Card className="hover:shadow-lg transition-shadow duration-300">
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <CalendarIcon className="h-5 w-5 text-blue-500"/>
//                                     Détails de la location
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-4">
//                                     <Alert>
//                                         <AlertCircleIcon className="h-4 w-4"/>
//                                         <AlertDescription>
//                                             Location en cours - Retour prévu dans 2h
//                                         </AlertDescription>
//                                     </Alert>

//                                     <div className="space-y-3">
//                                         <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                                             <div>
//                                                 <p className="text-sm text-gray-500">Début</p>
//                                                 <p className="font-medium">
//                                                     {new Date(location.rental.startDate).toLocaleString('fr-FR')}
//                                                 </p>
//                                             </div>
//                                             <ClockIcon className="h-5 w-5 text-gray-400"/>
//                                         </div>

//                                         <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                                             <div>
//                                                 <p className="text-sm text-gray-500">Fin</p>
//                                                 <p className="font-medium">
//                                                     {new Date(location.rental.endDate).toLocaleString('fr-FR')}
//                                                 </p>
//                                             </div>
//                                             <ClockIcon className="h-5 w-5 text-gray-400"/>
//                                         </div>

//                                         <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                                             <div>
//                                                 <p className="text-sm text-gray-500">Montant</p>
//                                                 <p className="font-medium text-lg">
//                                                     {location.rental.amount}€
//                                                 </p>
//                                             </div>
//                                             <CreditCardIcon className="h-5 w-5 text-blue-500"/>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         {/* Informations du chauffeur */}
//                         {location.driver && (
//                             <Card className="hover:shadow-lg transition-shadow duration-300">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <UserIcon className="h-5 w-5 text-blue-500"/>
//                                         Chauffeur
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="flex items-center space-x-4">
//                                             <div className="relative">
//                                                 <img
//                                                     src={location.driver.image}
//                                                     alt={location.driver.name}
//                                                     className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
//                                                 />
//                                                 <span
//                                                     className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium">{location.driver.name}</p>
//                                                 <RatingStars rating={location.driver.rating}/>
//                                                 <p className="text-sm text-gray-500">{location.driver.experience} d&#39;expérience</p>
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-1 gap-2">
//                                             <a href={`tel:${location.driver.phone}`}
//                                                className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                                                 <PhoneIcon className="h-4 w-4 text-gray-500"/>
//                                                 <span className="text-sm">{location.driver.phone}</span>
//                                             </a>
//                                             <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
//                                                 <KeyIcon className="h-4 w-4 text-gray-500"/>
//                                                 <span className="text-sm">Permis: {location.driver.license}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LocationDetails;


"use client";
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import { RentalSummaryOrg } from '@/components/organisation/RentalSummaryOrg';
import { DriverProps } from '@/utils/types/DriverProps';
// import Map from '@/components/organisation/Map';
import dynamic from 'next/dynamic';
import { LocationProps } from '@/utils/types/LocationProps';

const Map = dynamic(() => import("@/components/organisation/Map"), { ssr: false });

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
                        (d: DriverProps) => d.id === location?.driver?.driver_id                    );
                    setDriver(foundDriver || null); // Trouve le véhicule correspondant à l'ID
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, [location?.driver?.driver_id]);
    
    
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
            <div>
                <h1 className="text-xl font-bold mb-4">Visualisation du Trajet</h1>
                <Map />
            </div>
           

        </div>
    );
};

export default Renting;

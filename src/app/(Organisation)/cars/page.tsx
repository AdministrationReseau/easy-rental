'use client'

import { useState, useEffect } from 'react';
import ResourceEditForm from '../../../components/ResourceEditForm';
import { ResourceCard } from '@/components/ResourceCard';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import Link from 'next/link';
import Image from "next/image";


export default function VehiclesPage() {
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [formModalResource, setFormModalResource] = useState<CarProps | null>(null);

    const closeEditForm = () => {
        setFormModalResource(null);
        setIsEditFormOpen(false);
    }

    // const openEditForm = (resourceId: number) => {
    //     setFormModalResource(vehicles.find((vehicle) => vehicle.id === resourceId) || null);
    //     setIsEditFormOpen(true);
    // }

    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    //Etat des champs des formulaires
    const [vehicleDescription, setVehicleDescription] = useState<string>("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehiclePricePerDay, setVehiclePricePerDay] = useState<number>(0);
    const [vehicleBrand, setVehicleBrand] = useState("");
    const [vehicleFuel_EfficiencyCity, setVehicleFuel_EfficiencyCity] = useState("");
    const [VehicleFuel_EfficiencyHighway, setVehicleFuel_EfficiencyHighway] = useState("");


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

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const [filters, setFilters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
    });

    const filteredCarrs = vehicles.filter((vehicle) => {
        const isInType = filters.type !== null ? vehicle.type == filters.type[0] : true;
        const isCapacityInRange = filters.capacity !== null ? vehicle.engine.capacity == filters.capacity : true;
        const isPriceInRange = filters.priceRange !== null ? vehicle.pricePerDay >= filters.priceRange[0] && vehicle.pricePerDay <= filters.priceRange[1]: true;
    
        return isInType && isCapacityInRange && isPriceInRange;
    });

    const handleFilterChange = (newFilters: FilterVehicleProps) => {
        setFilters(newFilters);
        setVehicles(filteredCarrs);
    };

   const [showModal, setShowModal] = useState(false);
   const [selectedImages, setSelectedImages] = useState<string[]>([]);

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedImages(imageUrls);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        switch(name) {
            case 'vehicleBrand':
                setVehicleBrand(value);
                break;
            case 'vehicleType':
                setVehicleType(value);
                break;
            case 'vehicleFuel_EfficiencyCity':
                setVehicleFuel_EfficiencyCity(value);
                break;
            case 'vehicleFuel_EfficiencyHighway':
                setVehicleFuel_EfficiencyHighway(value);
                break;
            case 'vehiclePricePerDay':
                setVehiclePricePerDay(Number(value));
                break;
            case 'vehicleModel':
                setVehicleModel(value);
                break;
        }
    };
    
    

    const handleAddVehicle = (event: React.FormEvent) => {
        event.preventDefault();
    
        const newVehicle: CarProps = {
            id: vehicles.length + 1, // ID unique (à remplacer par un vrai ID si backend)
            type: vehicleType,
            passenger: 3,
            description: vehicleDescription,
            pricePerDay: vehiclePricePerDay,
            model: vehicleModel,
            brand: vehicleBrand,
            fuel_efficiency: { city: vehicleFuel_EfficiencyCity, highway: VehicleFuel_EfficiencyHighway },
            images: selectedImages,
            fonctionnalities: {
                air_condition: false,
                usb_input: false,
                seat_belt: false,
                audio_input: false,
                child_seat: false,
                bluetooth: false,
                sleeping_bed: false,
                onboard_computer: false,
                gps: false,
                luggage: false,
                water: false,
                additional_covers: false
            },
            engine: {
                type: undefined,
                horsepower: undefined,
                capacity: undefined
            },
            service_history: [],
            reviews: [],
            favorite: false
        };
    
        // Mettre à jour la liste des véhicules avec le nouveau véhicule
        setVehicles([...vehicles, newVehicle]);
    
        // Fermer le modal après l'ajout
        setShowModal(false);
    
        // Réinitialiser le formulaire
        setVehicleDescription("");
        setVehicleModel("");
        setVehicleBrand("");
        setVehicleType("");
        setVehicleFuel_EfficiencyCity("");
        setVehicleFuel_EfficiencyHighway("");
        setVehiclePricePerDay(0);
        setSelectedImages([]);
    };

    const handleDeleteVehicle = (id: number) =>{
        // console.log(vehicles);
        const newVehicles = [...vehicles];
        newVehicles.splice(id, 1);
        setVehicles(newVehicles);
        // setVehicles((prevVehicles) => prevVehicles.filter(vehicle => vehicle.id !== id));

    };
    

    return (
        <div className='h-full w-[100%] flex flex-col gap-2 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your vehicles</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{vehicles.length} vehicles</span>
                    </div>
                </div>
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            
            <div className="my-4">
                <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
            </div>
            
            <button
                    className="bg-blue-500 inherit w-60 text-white px-4 py-3 rounded mb-4"
                    onClick={() => setShowModal(true)}
                >
                    + ADD A VEHICLE
                </button> 

            <div className='h-full flex flex-row gap-0'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full h-full'>
                    {vehicles.map((vehicle) => (
                        <Link href={`/cars/${vehicle.id}`} key={vehicle.id}>
                            <ResourceCard key={vehicle.id} resource={vehicle} profilActive={false} onDelete={() => handleDeleteVehicle(vehicle.id)} />
                        </Link>
                    ))}
                </div>
            </div>

            { formModalResource && isEditFormOpen &&
                <ResourceEditForm resource={formModalResource} onClose={closeEditForm} />   
            }

            {/* Modal de création */}
                            {showModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-white p-6 rounded shadow-lg">
                                        <h2 className="text-lg font-bold mb-4">Create Vehicule</h2>
                                        <form onSubmit={handleAddVehicle}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">Name</label>
                                                <input
                                                    type="text"
                                                    name="vehicleBrand"
                                                    value={vehicleBrand}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">Name</label>
                                                <textarea
                                                    name="vehicleDescription"
                                                    value={vehicleDescription}
                                                    onChange={(e) => setVehicleDescription(e.target.value)}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                />
                                            </div>
                                            
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">Type</label>
                                                <input
                                                    type="text"
                                                    name="vehicleType"
                                                    value={vehicleType}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="vehicleFuel_EfficiencyCity"
                                                    value={vehicleFuel_EfficiencyCity}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                    placeholder="number of persons"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">
                                                    Highway
                                                </label>
                                                <input
                                                    type="text"
                                                    name="VehicleFuel_EfficiencyHighway"
                                                    value={VehicleFuel_EfficiencyHighway}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                    placeholder="Transmission mode"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">
                                                    Price per day
                                                </label>
                                                <input
                                                    type="text"
                                                    name="vehiclePricePerDay"
                                                    value={vehiclePricePerDay}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded w-full p-2"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">
                                                    Images
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="border border-gray-300 rounded w-full p-2"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
            
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {selectedImages.map((src, index) => (
                                                    <div
                                                        key={index}
                                                        className="border border-gray-300 rounded overflow-hidden"
                                                    >
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${index + 1}`}
                                                            width={100}
                                                            height={100}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
            
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
        </div>
    );
}


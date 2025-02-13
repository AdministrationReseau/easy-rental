'use client'


import { useState, useEffect } from 'react';
// import ResourceEditForm from '../../../components/ResourceEditForm';
import { ResourceCard } from '@/components/ResourceCard';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import Link from 'next/link';
import Image from "next/image";
// import { CarCard } from '@/components/CarCard';
import { CustomCheckbox } from '@/components/FormComponents';

// VehicleModal component for reuse between create and edit
const VehicleModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialData = null,
    title 
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (vehicleData: Partial<CarProps>) => void;
    initialData?: CarProps | null;
    title: string;
}) => {
    const [vehicleData, setVehicleData] = useState({
        description: initialData?.description || "",
        license_plate: initialData?.license_plate || "",
        type: initialData?.type || "",
        model: initialData?.model || "",
        pricePerDay: initialData?.pricePerDay || 0,
        brand: initialData?.brand || "",
        passenger: initialData?.passenger || 3,
        images: initialData?.images || [],
        fonctionnalities: initialData?.fonctionnalities || {
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
        }
    });

    const features = [
        "Air Condition",
        "Child Seat",
        "GPS",
        "USB Input",
        "Bluetooth",
        "Luggage",
        "Seat Belt",
        "Sleeping Bed",
        "Water",
        "Audio Input",
        "Onboard Computer",
        "Additional Covers",
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setVehicleData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setVehicleData(prev => ({
                ...prev,
                images: [...prev.images, ...imageUrls]
            }));
        }
    };

    const handleFeatureChange = (feature: string, checked: boolean) => {
        const featureKey = feature.toLowerCase().replace(" ", "_");
        setVehicleData(prev => ({
            ...prev,
            fonctionnalities: {
                ...prev.fonctionnalities,
                [featureKey]: checked
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(vehicleData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white p-6 rounded shadow-lg w-fit h-fit fit-content max-w-6xl w-full">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col flex-1">
                        
                        
                        {/* Basic Information */}
                        <div className=" mb-4">
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={vehicleData.brand}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">Model</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={vehicleData.model}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                        

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={vehicleData.description}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                    rows={3}
                                />
                            </div>

                        
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={vehicleData.type}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">License Plate</label>
                                <input
                                    type="text"
                                    name="license_plate"
                                    value={vehicleData.license_plate}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                        
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">Price per day</label>
                                <input
                                    type="number"
                                    name="pricePerDay"
                                    value={vehicleData.pricePerDay}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className=" mb-4">
                                <label className="block text-sm font-medium">Passengers</label>
                                <input
                                    type="number"
                                    name="passenger"
                                    value={vehicleData.passenger}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                        

                            {/* Images */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="border border-gray-300 rounded w-full p-2"
                                    onChange={handleImageChange}
                                />
                                
                            </div>
                        </div>
                    

                    </div>
                        <div className="flex flex-col flex-1">
                           
                            <div className=" w-[300px] h-[300px] mt-2 rounded fit-content border border-gray-300">
                                {vehicleData.images.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt={`Preview ${index + 1}`} 
                                            layout='responsive'
                                            width={300}
                                            height={300}
                                            className="object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Features */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Features</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((feature) => (
                                        <div key={feature} className="flex items-center">
                                            <CustomCheckbox
                                                label={feature}
                                                checked={vehicleData.fonctionnalities[feature.toLowerCase().replace(" ", "_") as keyof typeof vehicleData.fonctionnalities]}
                                                onChange={(e: { target: { checked: boolean; }; }) => handleFeatureChange(feature, e.target.checked)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<CarProps | null>(null);
    const [filters, setFilters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
    });
    const [showAlert, setShowAlert] = useState(false);

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
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
            });
    }, []);

    const handleCreateVehicle = (vehicleData: Partial<CarProps>) => {
        const newVehicle: CarProps = {
            ...vehicleData as CarProps,
            id: vehicles.length + 1,
            engine: {
                type: undefined,
                horsepower: undefined,
                capacity: undefined
            },
            service_history: [],
            reviews: [],
            favorite: false
        };

        setVehicles([...vehicles, newVehicle]);
        setShowCreateModal(false);
        setShowAlert(true);
    };

    const handleModifyVehicle = ( vehicleData: Partial<CarProps>) => {
        if (!editingVehicle) return;
        
        const updatedVehicles = vehicles.map(vehicle => 
            vehicle.id === editingVehicle.id ? { ...vehicle, ...vehicleData } : vehicle
        );
        
        setVehicles(updatedVehicles);
        // setEditingVehicle(null);
        setShowAlert(true);
    };

    const handleDeleteVehicle = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); // Empêche la navigation du Link
        e.stopPropagation();
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    };

    const filteredVehicles = vehicles.filter((vehicle) => {
        const isInType = filters.type.length === 0 || (vehicle.type && filters.type.includes(vehicle.type));
        const isCapacityInRange = !filters.capacity || vehicle.engine.capacity === filters.capacity;
        const isPriceInRange = vehicle.pricePerDay >= filters.priceRange[0] && vehicle.pricePerDay <= filters.priceRange[1];
        return isInType && isCapacityInRange && isPriceInRange;
    });

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
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from:</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>

            <div className="my-4">
                <SidebarFilter vehicles={vehicles} onFilter={setFilters} />
            </div>

            <button
                className="bg-blue-500 inherit w-60 text-white px-4 py-3 rounded mb-4"
                onClick={() => setShowCreateModal(true)}
            >
                + ADD A VEHICLE
            </button>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full'>
                {filteredVehicles.map((vehicle) => (
                    <Link href={`/cars/${vehicle.id}`} key={vehicle.id}>
                        <ResourceCard 
                            resource={vehicle} 
                            profilActive={false} 
                            onDelete={(e) => handleDeleteVehicle(e,vehicle.id)}
                            onEdit={() => { setEditingVehicle(vehicle); console.log(editingVehicle); }}
                        />
                    </Link>
                ))}
            </div>

            <VehicleModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateVehicle}
                title="Create Vehicle"
            />

            <VehicleModal
                isOpen={!!editingVehicle}
                onClose={() => setEditingVehicle(null)}
                onSubmit={handleModifyVehicle}
                initialData={editingVehicle}
                title="Edit Vehicle"
            />

            {showAlert && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
                    Vehicle successfully {editingVehicle ? 'updated' : 'created'}!
                </div>
            )}
        </div>
    );
}
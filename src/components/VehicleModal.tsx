'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CustomCheckbox } from '@/components/FormComponents';
import {VehicleModalProps} from "@/utils/types/CarProps";

const VehicleModal = ({
                          isOpen,
                          onClose,
                          onSubmit,
                          initialData,
                          title
                      }: VehicleModalProps) => {
    const [vehicleData, setVehicleData] = useState({
        description: initialData?.description || "",
        license_plate: initialData?.license_plate || "",
        type: initialData?.type || "",
        model: initialData?.model || "",
        engine: initialData?.engine || {
            capacity: 2,
            horsepower: 10,
            type:""
        },
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto m-2 z-200">
            <div className="bg-white p-6 rounded shadow-lg w-fit h-fit fit-content max-w-6xl w-full">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col flex-1">
                            {/* Basic Information */}
                            <div className="mb-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={vehicleData.brand}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
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
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={vehicleData.type}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">License Plate</label>
                                    <input
                                        type="text"
                                        name="license_plate"
                                        value={vehicleData.license_plate}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Price per day</label>
                                    <input
                                        type="number"
                                        name="pricePerDay"
                                        value={vehicleData.pricePerDay}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
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
                            {/* Selected Images */}
                            <div className="w-[300px] h-[300px] mt-2 rounded fit-content border border-gray-300">
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

export default VehicleModal;
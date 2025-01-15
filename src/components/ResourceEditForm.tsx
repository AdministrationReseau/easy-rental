import { CarProps } from '@/utils/types/CarProps';
import { DriverProps } from '@/utils/types/DriverProps';
import React, { useState } from 'react';

export interface Vehicle {
    id: number;
    type: string;
    brand: string;
    model: string;
    year: number;
    passenger: number;
    pricePerDay: number;
    vin: string;
    engine: {
        type: string;
        horsepower: number;
        capacity: number;
    };
    transmission: string;
    color: string;
    fuel_efficiency: {
        city: number;
        highway: number;
    };
    license_plate: string;
    registration: {
        state: string;
        expiry: string;
    };
    owner: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    service_history: {
        date: string;
        service_type: string;
        mileage: number;
        provider: string;
    }[];
    insurance: {
        provider: string;
        policy_number: string;
        expiry: string;
    };
    images: string[];
}
  
export interface Driver {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    license_number: string;
    license_type: string;
    address: string;
    phone: string;
    email: string;
    vehicle_assigned: {
        id: number;
        make: string;
        model: string;
        year: number;
    };
    rating: number;
    insurance_provider: string;
    insurance_policy: string;
    profile_picture: string;
}

export type Resource = DriverProps | CarProps;

interface ResourceEditFormProps {
    resource: Resource,
    // isOpen: boolean;
    onClose: () => void;
    // onSave: ((updatedVehicle: Vehicle) => void) | null;
}

export default function ResourceEditForm({ resource, onClose }: ResourceEditFormProps) {
    const [formData] = useState<Resource>(resource);

    const isVehicle: boolean = 'brand' in resource;
    const vehicleFormData = formData as CarProps;
    const driverFormData = formData as DriverProps;

    const fields = isVehicle
    ? [
        { name: 'brand', label: 'Brand', value: vehicleFormData.brand, type: 'text' },
        { name: 'model', label: 'Model', value: vehicleFormData.model, type: 'text' },
        { name: 'year', label: 'Year', value: vehicleFormData.year, type: 'number' },
        { name: 'pricePerDay', label: 'Price per Day', value: vehicleFormData.pricePerDay, type: 'number' },
        { name: 'vin', label: 'VIN', value: vehicleFormData.vin, type: 'text' },
        { name: 'engine.type', label: 'Engine Type', value: vehicleFormData.engine.type, type: 'text' },
        { name: 'engine.horsepower', label: 'Horsepower', value: vehicleFormData.engine.horsepower, type: 'number' },
        { name: 'engine.capacity', label: 'Engine Capacity (L)', value: vehicleFormData.engine.capacity, type: 'number' },
        { name: 'transmission', label: 'Transmission', value: vehicleFormData.transmission, type: 'text' },
        { name: 'color', label: 'Color', value: vehicleFormData.color, type: 'text' },
        { name: 'fuel_efficiency.city', label: 'Fuel Efficiency (City)', value: vehicleFormData.fuel_efficiency?.city, type: 'number' },
        { name: 'fuel_efficiency.highway', label: 'Fuel Efficiency (Highway)', value: vehicleFormData.fuel_efficiency?.highway, type: 'number' },
        { name: 'license_plate', label: 'License Plate', value: vehicleFormData.license_plate, type: 'text' },
        { name: 'registration.state', label: 'Registration State', value: vehicleFormData.registration?.state, type: 'text' },
        { name: 'registration.expiry', label: 'Registration Expiry Date', value: vehicleFormData.registration?.expiry, type: 'date' },
        { name: 'owner.name', label: 'Owner Name', value: vehicleFormData.owner?.name, type: 'text' },
        { name: 'owner.address', label: 'Owner Address', value: vehicleFormData.owner?.address, type: 'text' },
        { name: 'owner.phone', label: 'Owner Phone', value: vehicleFormData.owner?.phone, type: 'tel' },
        { name: 'owner.email', label: 'Owner Email', value: vehicleFormData.owner?.email, type: 'email' },
        { name: 'insurance.provider', label: 'Insurance Provider', value: vehicleFormData.insurance?.provider, type: 'text' },
        { name: 'insurance.policy_number', label: 'Insurance Policy Number', value: vehicleFormData.insurance?.policy_number, type: 'text' },
        { name: 'insurance.expiry', label: 'Insurance Expiry Date', value: vehicleFormData.insurance?.expiry, type: 'date' },
    ]
    : [
        { name: 'first_name', label: 'First Name', value: driverFormData.first_name, type: 'text' },
        { name: 'last_name', label: 'Last Name', value: driverFormData.last_name, type: 'text' },
        { name: 'age', label: 'Age', value: driverFormData.age, type: 'number' },
        { name: 'license_number', label: 'License Number', value: driverFormData.license_number, type: 'text' },
        { name: 'license_type', label: 'License Type', value: driverFormData.license_type, type: 'text' },
        { name: 'address', label: 'Address', value: driverFormData.address, type: 'text' },
        { name: 'phone', label: 'Phone Number', value: driverFormData.phone, type: 'tel' },
        { name: 'email', label: 'Email', value: driverFormData.email, type: 'email' },
        { name: 'insurance_provider', label: 'Insurance Provider', value: driverFormData.insurance_provider, type: 'text' },
        { name: 'insurance_policy', label: 'Insurance Policy Number', value: driverFormData.insurance_policy, type: 'text' },
        { name: 'profile_picture', label: 'Profile Picture', value: driverFormData.profile_picture, type: 'file' },
    ];
    
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    //     const handleChange = () => {
    //     // const { value } = e.target;
    //     // const fields = field.split('.');

    //     setFormData((prevData): Resource | null => {
    //         if (!prevData) {
    //             return null;
    //         }

    //         const newData = { ...prevData };
    //         // let ref: Record<string, any> = newData;
            
    //         // fields.forEach((key: string, index: number) => {
    //         //     if (index === fields.length - 1) {
    //         //         ref[key] = value;
    //         //     } else {
    //         //         ref = ref[key];
    //         //     }
    //         // });
            
    //         return newData;
    //     });
    // };

    // const handleSave = () => {
    //     // onSave(formData);
    //     onClose();
    // };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="h-4/5 overflow-auto bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Edit {isVehicle ? 'Vehicle' : 'Driver'}</h2>

                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-semibold">{field.label}</label>
                            <input
                                type={field.type}
                                value={
                                    field.type === 'date' && field.value instanceof Date
                                        ? field.value.toISOString().split('T')[0] // Convertir Date en 'YYYY-MM-DD'
                                        : (field.value as string) // Assurer TypeScript que c'est une string
                                }
                                onChange={() => {}}
                                // onChange={(e) => handleChange(e, field.name)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-md">Cancel</button>
                    {/* <button onClick={handleSave} className="py-2 px-4 bg-blue-600 text-white rounded-md">Save Changes</button> */}
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-md">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
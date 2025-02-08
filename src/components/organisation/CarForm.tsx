'use state'

import { useState } from "react";
import { CarProps } from "@/utils/types/CarProps";

interface CarFormProps {
    addVehicle: (car: CarProps) => void;
    carFormOpened: boolean;
    setAddCarFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CarForm({ addVehicle, carFormOpened, setAddCarFormOpened }: CarFormProps) {
    const [car, setCar] = useState<CarProps>({
        id: Date.now(),
        type: "",
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        rating: 0,
        passenger: 0,
        description: [""],
        pricePerDay: 0,
        vin: "",
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
            additional_covers: false,
        },
        engine: { type: "", horsepower: 0, capacity: 0 },
        transmission: "",
        color: "",
        fuel_efficiency: { city: "", highway: "" },
        license_plate: "",
        registration: { state: "", expiry: new Date() },
        owner: { name: "", address: "", phone: "", email: "" },
        service_history: [],
        insurance: { provider: "", policy_number: "", expiry: new Date() },
        images: [],
        reviews: [],
        favorite: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCar(prev => ({ ...prev, [name]: value }));
    };

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setCar(prev => ({ ...prev, description: [value] }));
    };
    
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCar(prev => ({
            ...prev,
            images: [...prev.images, value]
        }));
    };

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCar(prev => ({
            ...prev,
            fonctionnalities: {
                ...prev.fonctionnalities,
                [name]: checked
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        console.log(car.id);
        e.preventDefault();
        addVehicle(car);
        setAddCarFormOpened(false);
    };

    return carFormOpened ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[80%] max-h-[90%] overflow-y-auto shadow-lg relative flex flex-col gap-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold">Add Vehicle</h2>
                    <button
                        className="text-xl absolute top-3 right-3 text-gray-600 hover:text-red-500"
                        onClick={() => setAddCarFormOpened(false)}
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <fieldset className="border border-primary-blue/30 p-2 flex flex-col gap-1">
                        <legend className="font-bold text-primary-blue uppercase">Basic Informations</legend>
                        <div className="flex flex-col">
                            <label htmlFor="type" className="text-gray-700">Type</label>
                            <input id="type" type="text" name="type" placeholder="Type" value={car.type} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="brand" className="text-gray-700">Brand</label>
                            <input id="brand" type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="model" className="text-gray-700">Model</label>
                            <input id="model" type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="year" className="text-gray-700">Year</label>
                            <input id="year" type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="passenger" className="text-gray-700">Number of passengers</label>
                            <input id="passenger" type="number" name="passenger" placeholder="Number of passengers" value={car.passenger} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="pricePerDay" className="text-gray-700">Price per day</label>
                            <input id="pricePerDay" type="number" name="pricePerDay" placeholder="Price per day" value={car.pricePerDay} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="vin" className="text-gray-700">Vin</label>
                            <input id="vin" type="text" name="vin" placeholder="Vin" value={car.vin} onChange={handleChange} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-gray-700">Description</label>
                            <textarea name="description" value={car.description[0] || ''} onChange={handleDescription} className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-blue/50"></textarea>
                        </div>
                    </fieldset>
                    <fieldset className="border border-primary-blue/30 p-2 flex flex-col gap-1">
                        <legend className="font-bold text-primary-blue uppercase">Functionalities</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {Object.keys(car.fonctionnalities).map((feature, index) => (
                                <label key={`feature-${index}`} className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        name={feature} 
                                        checked={car.fonctionnalities[feature as keyof typeof car.fonctionnalities]} 
                                        onChange={handleFeatureChange} 
                                    />
                                    <span className="capitalize">{feature.replace("_", " ")}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Add Vehicle
                    </button>
                </form>
            </div>
        </div>
    ) : null;
}

'use client';

import React, { useState, useEffect } from 'react';
import Field from '@/components/base-component/fields';
import { RentalSummary } from "@/components/customer/RentalSummary";
import { useParams } from "next/navigation";
import { CustomSelect } from '@/components/Select';
import { CountryPickerStyled } from '@/components/CountryPicker';
import { TimePickerStyled } from '@/components/TimePicker';
import { DatePickerStyled } from '@/components/DatePicker';
import Image from 'next/image';
import ComboBox from '@/components/ComboBox';
import { CustomCheckbox } from '@/components/Checkbox';

const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1); // État pour suivre l'étape actuelle
    const totalSteps = 4; // Nombre total d'étapes
    const options=
    [
        {
            name:"PayPal",
            icon:"/paypal.png"
        },
        {
            name:"Bitcoin",
            icon:"/bitcoin.png"
        }
    ]
    const [checkboxes, setCheckboxes] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    // Gestion du changement de valeur
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };
    const handleSelectionChange = (value: string) => {
        console.log("Option sélectionnée :", value);
      };
    // Contenu dynamique pour chaque étape
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h1><b> Billing Info</b></h1>
                        <div className="flex flex-row justify-between text-secondary-text">
                            <p>Please enter your billing info</p>
                            <p>Step {currentStep} of {totalSteps}</p>

                        </div>
                        <div className='flex flex-row gap-4'>
                            <Field label="Name" placeholder="Your name" required={true} />
                            <Field label="Phone number" placeholder="Phone number" required={true} />
                        </div>
                        <div className='flex flex-row gap-4'>
                            <Field label="Address" placeholder="Your address" required={true} />
                            <Field label="Town/City" placeholder="Town or city" required={true} />
                        </div>

                    </>
                );
            case 2:
                return (
                    <>
                        <h1><b> Rental Info</b></h1>
                        <div className="flex flex-row justify-between text-secondary-text">
                            <p>Please select your rental date</p>
                            <p>Step {currentStep} of {totalSteps}</p>

                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-primary-blue bg-005FFE shadow-[0_0_10px_1px_rgba(0,96,254,0.6)]"></div>
                            <span>Pick-Up</span>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col w-[70%]">
                                <div className="flex h-full ">
                                    <CountryPickerStyled />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex h-full ">
                                    <DatePickerStyled />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className="flex flex-col w-[70%]">
                                <div className="flex h-full items-center">
                                    <TimePickerStyled />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-primary-blue bg-005FFE shadow-[0_0_10px_1px_rgba(0,96,254,0.6)]"></div>
                            <span>Back-Off</span>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col w-[70%]">
                                <div className="flex h-full ">
                                    <CountryPickerStyled />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex h-full ">
                                    <DatePickerStyled />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className="flex flex-col w-[70%]">
                                <div className="flex h-full items-center">
                                    <TimePickerStyled />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex h-full ">
                                    <DatePickerStyled />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                         <h1><b> Payment Method</b></h1>
                        <div className="flex flex-row justify-between text-secondary-text">
                            <p>Please enter your payment method</p>
                            <p>Step {currentStep} of {totalSteps}</p>

                        </div>
                        <div className="flex flex-row justify-between text-secondary-text">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-3 h-3 rounded-full bg-primary-blue bg-005FFE shadow-[0_0_10px_1px_rgba(0,96,254,0.6)]"></div>
                                <span>Credit Card</span>
                            </div>
                            <div className='flex flex-row'>
                                <Image 
                                    src="/mastarcard.png" 
                                    alt="logo-mastercard"
                                    width = {40}
                                    height= {40} 
                                    className="object-contain"/>
                                <Image 
                                    src="/visa.png" 
                                    alt="logo-visa"
                                    width = {80}
                                    height= {35} 
                                    className="object-contain"/>
                            </div>

                        </div>
                        <div className='flex flex-row gap-4'>
                            <Field label="Card Number" placeholder="Card number" required={true} />
                            <div className="flex flex-col">
                                <div className="flex h-full ">
                                    <DatePickerStyled />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <Field label="Card Holder" placeholder="Card holder" required={true} />
                            <Field label="CVC" placeholder="CVC" required={true} />
                        </div>
                        <div className="w-full ">
                            <ComboBox
                            options={options}
                            onChange={handleSelectionChange}
                            width="100%" // Largeur ajustable
                            />
                        </div>
                    </>
                );
            case 4:
                return (
                <>
                     <h1><b> Confirmation</b></h1>
                        <div className="flex flex-row justify-between text-secondary-text">
                            <p>We are getting to the end just few clicks and your rental is ready</p>
                            <p>Step {currentStep} of {totalSteps}</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            
                            {/* Liste de checkboxes */}
                            <CustomCheckbox
                                label="I agree with sending an Marketingg and newsletter emails. No spam, promised! "
                                checked={checkboxes.option1}
                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'option1' } })}
                            />
                            <CustomCheckbox
                                label="I agree with our terms and conditions and privacy policy."
                                checked={checkboxes.option2}
                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'option2' } })}
                            />
                        </div>
                    <p className="text-center ">Review your information and confirm!</p>
                    <Image 
                        src="/data-secured.png" 
                        alt="logo-visa"
                        width = {40}
                        height= {35} 
                        className="object-contain"/>
                    <h1>All your data are safe</h1>
                    <p className='text-secondary-text'>We are using the most advanced security to privide you the best experience ever</p>
                </>
                )
            default:
                return null;
        }
    };
    const { id } = useParams(); // Récupération de l'ID via Next.js
    // const [vehicle, setVehicle] = useState<Vehicle | null>(null); // État pour le véhicule
    const [loading, setLoading] = useState(true); // État de chargement

    // Charger les données du véhicule
    const [vehicle, setVehicle] = useState<any | null>(null);
    const [vehicles, setVehicles] = useState<any[]>([]);

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
                        (v: any) => v.id.toString() === id
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

    return (
        <div className='flex mt-20 bg-gray-100'>
            <div className="m-8 w-full">
                

                {/* Formulaire dynamique */}
                <div className="bg-white rounded-lg shadow-md p-6 w-full space-y-4 mx-auto">


                    <div className="space-y-4">{renderStepContent()}</div>

                    {/* Boutons de navigation */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                            disabled={currentStep === 1}
                            className={`py-2 px-4 rounded-md transition ${currentStep === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 hover:bg-gray-400'
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
                            className={`py-2 px-4 rounded-md transition ${currentStep === totalSteps
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary-blue text-white hover:bg-blue-600'
                                }`}
                        >
                            {currentStep === totalSteps ? 'Rent Now' : 'Next'}
                        </button>
                    </div>
                </div>
                {/* Barre des étapes */}
                    <div className="flex mt-10 justify-center items-center mb-6">
                    {Array.from({ length: totalSteps }, (_, index) => (
                        <div
                            key={index}
                            className={`w-4 h-4 rounded-full mx-2 ${index + 1 === currentStep ? 'bg-primary-blue' : 'bg-gray-300'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
            <aside className="w-[70%]  p-4 mt-4">
                <RentalSummary
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
                />
            </aside>
        </div>
    );
};

export default MultiStepForm;

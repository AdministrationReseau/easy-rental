/*
'use client'

import React, { useState } from 'react';
import { CustomAlert } from '@/components/Alert'
import { CustomCheckbox } from '@/components/Checkbox'
import {CustomSelect} from '@/components/Select'
import { CustomPassword } from '@/components/Password';
import { CarCard } from '@/components/CarCard';
import { AgencyCard } from '@/components/AgencyCard';
import NavBar from '@/components/Navbar';


const carList = [
    {
        id: '1',
        imageUrl: 'car.png',
        brand: 'Toyota',
        model: 'Camry',
        fuel: 80,
        gearbox: 'Manuelle',
        passengers: 5,
        pricePerDay: 5000,
    },
    {
        id: '2',
        imageUrl: 'car.png',
        brand: 'BMW',
        model: 'X5',
        fuel: 50,
        gearbox: 'Automatique',
        passengers: 5,
        pricePerDay: 8000,
    },
];


export default function Test() {

    const [checked, setChecked] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [password, setPassword] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [likedCars, setLikedCars] = useState<string[]>([]);
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];



    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleLike = (id: string) => {
        setLikedCars((prev) => [...prev, id]);
    };

    const handleDislike = (id: string) => {
        setLikedCars((prev) => prev.filter((carId) => carId !== id));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [likedAgencies, setLikedAgencies] = useState<string[]>([]); // Etat pour suivre les agences likées

    // Fonction pour ajouter un like à une agencies
    const handleLikeAgency = (id: string) => {
        setLikedAgencies((prev) => [...prev, id]);
        console.log(`Agence ${id} likée`);
    };

    // Fonction pour enlever un like d'une agencies
    const handleDislikeAgency = (id: string) => {
        setLikedAgencies((prev) => prev.filter((likedId) => likedId !== id));
        console.log(`Agence ${id} dislikée`);
    };
    return (
        <div>
            <NavBar/>
            <main>
                <div>
                    <CustomAlert message="hellloooooooo guyssss" type='warning' width="w-full sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[900px]"/>

                    <CustomCheckbox label="Agree to terms" checked={checked} onChange={handleCheck}/>

                    <CustomSelect
                        label="Sélectionnez une option"
                        options={options}
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value as string)}
                    />
                     <CustomPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <div className="flex justify-center items-center flex-wrap gap-4 p-6 bg-gray-100">
                        {carList.map((car) => (
                            <CarCard
                                key={car.id}
                                id={car.id}
                                imageUrl={car.imageUrl}
                                brand={car.brand}
                                model={car.model}
                                fuel={car.fuel}
                                gearbox={car.gearbox}
                                passengers={car.passengers}
                                pricePerDay={car.pricePerDay}
                                onLike={handleLike}
                                onDislike={handleDislike}
                            />
                        ))}
                         <AgencyCard
                            id="1"
                            imageUrl="ADN.png"
                            agency="Agence 1"
                            slogan="Votre partenaire de confiance"
                            stars={5}
                            followers={1200}
                            isOpen={true}
                            city="Yaoundé"
                            location="Centre-ville"
                            onLike={handleLikeAgency}
                            onDislike={handleDislikeAgency}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
*/

import React from 'react';
import Reviews from "@/components/Reviews";
import Records from "@/components/Records";
import Abonnement from "@/components/Abonnement";
import DriverCard from "@/components/DriverCard";
import OrgSidebar from "@/components/OrgSidebar";

const Test = () => {
    const options = [
        { label: "2 team members", available: true },
        { label: "20GB Cloud storage", available: true },
        { label: "Integration help", available: true },
        { label: "Sketch Files", available: true },
        { label: "API Access", available: true },
        { label: "Complete documentation", available: true },
        { label: "24×7 phone & email support", available: true },
    ];
    return (
        <div>
            <Reviews
                name="Brayanne test"
                starsValue={4.5}
                message="I found solution to all my design needs from Creative Tim. I use
                        them as a freelancer in my hobby projects for fun! And its really
                        affordable, very humble guys !!!"
            />
            <Records />
            <Abonnement
                title="Standard plan"
                price={49}
                frequency="month"
                options={options}
            />
            <DriverCard
                name="test test"
                age={25}
                email="test@gmail.com"
                location="yaounde"
                avatar="/car.png"
                stars={3.5}
                phone="620202020"
            />
            <OrgSidebar />
        </div>
    );
};

export default Test;

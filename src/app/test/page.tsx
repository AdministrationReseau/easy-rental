'use client'

import React, { useState } from 'react';
import { CustomAlert } from '@/components/Alert'
import { CustomCheckbox } from '@/components/Checkbox'
import Field from '@/components/base-component/fields';
import AgencyDetail from '@/components/combiner-components/agency-detail';
import CarDetailPage from '@/components/combiner-components/car-details';
import TransactionsPage from '@/components/base-component/transaction';

export default function Test() {

    const [checked, setChecked] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [password, setPassword] = useState('');
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

    const [likedAgencies, setLikedAgencies] = useState<string[]>([]); // Etat pour suivre les agences likées

    // Fonction pour ajouter un like à une agence
    const handleLikeAgency = (id: string) => {
        setLikedAgencies((prev) => [...prev, id]);
        console.log(`Agence ${id} likée`);
    };

    // Fonction pour enlever un like d'une agence
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
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
     
                  <Field
                    label="Last name"
                    placeholder="Enter your last name"
                    size="w-full xl:w-1/2"
                  />
                </div>
                <Field
                  label="Email"
                  type="password"
                  placeholder="Enter your email address"
                  required
                />
                <Field
                  label="Subject"
                  placeholder="Select subject"
                />
              
                </div>
                
                <AgencyDetail/>
                <CarDetailPage/>
                <TransactionsPage/>
            </main>
            
        </div>
    );
}

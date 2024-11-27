'use client'

import React, { useState } from 'react';
import { CustomAlert } from '@/components/Alert'
import { CustomCheckbox } from '@/components/Checkbox'
import ComboBox from '@/components/ComboBox'
import SearchField from "@/components/SearchField";
import TransactionList from "@/components/TransactionList";


export default function Test() {

    const paymentOptions = [
        { name: "PayPal", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
        { name: "Bitcoin", icon: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
    ];

    const [checked, setChecked] = useState(false);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
    };

    const handleChangeComboBox = (selectedValue: string) => {
        console.log("Option sélectionnée :", selectedValue);
    };

    const dumyTransactions = [
        {
            id: "1",
            title: "Currency exchange",
            description: "From ABC Bank ATM",
            date: "17 Sep 2023",
            time: "11:21 AM",
            amount: "$350.00",
            status: "pending",
            icon: "https://via.placeholder.com/40", // Icône de remplacement
        },
        {
            id: "2",
            title: "Cash-in",
            description: "From ABC Bank ATM",
            date: "17 Sep 2023",
            time: "10:34 AM",
            amount: "$100.00",
            status: "confirmed",
            icon: "https://via.placeholder.com/40",
        },
        {
            id: "3",
            title: "Transfer to card",
            description: "From ABC Bank ATM",
            date: "16 Sep 2023",
            time: "11:21 AM",
            amount: "$9,000.00",
            status: "confirmed",
            icon: "https://via.placeholder.com/40",
        },
        {
            id: "4",
            title: "Transfer to card",
            description: "From ABC Bank ATM",
            date: "15 Sep 2023",
            time: "11:21 AM",
            amount: "$9,267.00",
            status: "canceled",
            icon: "https://via.placeholder.com/40",
        },
        {
            id: "5",
            title: "Currency exchange",
            description: "From ABC Bank ATM",
            date: "17 Sep 2023",
            time: "11:21 AM",
            amount: "$350.00",
            status: "pending",
            icon: "https://via.placeholder.com/40", // Icône de remplacement
        },
        {
            id: "6",
            title: "Cash-in",
            description: "From ABC Bank ATM",
            date: "17 Sep 2023",
            time: "10:34 AM",
            amount: "$100.00",
            status: "confirmed",
            icon: "https://via.placeholder.com/40",
        },
        {
            id: "7",
            title: "Transfer to card",
            description: "From ABC Bank ATM",
            date: "16 Sep 2023",
            time: "11:21 AM",
            amount: "$9,000.00",
            status: "confirmed",
            icon: "https://via.placeholder.com/40",
        },
        {
            id: "8",
            title: "Transfer to card",
            description: "From ABC Bank ATM",
            date: "15 Sep 2023",
            time: "11:21 AM",
            amount: "$9,267.00",
            status: "canceled",
            icon: "https://via.placeholder.com/40",
        },
    ];

        return (
            <div>
                <main>
                    <div>
                        <CustomAlert message="hellloooooooo guyssss" type='warning'
                                     width="w-full sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[900px]"/>

                        <div className="p-8">
                            <h1 className="text-2xl font-bold text-primary-text mb-6">Search</h1>
                            <SearchField placeholder="Search something here" onSearch={handleSearch}/>

                        </div>

                        <div className="p-8">
                            <h1 className="text-2xl font-bold text-primary-text mb-6">Choisissez un mode de
                                paiement</h1>
                            <ComboBox options={paymentOptions} onChange={handleChangeComboBox} width="700px"/>
                        </div>

                        <div className="p-6 bg-background min-h-screen">
                            <TransactionList transactions={dumyTransactions}/>
                        </div>


                        <CustomCheckbox label="Agree to terms" checked={checked} onChange={handleCheck}/>
                    </div>
                </main>
            </div>
        );
}

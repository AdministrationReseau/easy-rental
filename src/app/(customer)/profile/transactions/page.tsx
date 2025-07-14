"use client";
import React, {useEffect, useState} from 'react';
import TransactionInfoCard from "@/components/TransactionInfoCard";
import TransactionList from "@/components/TransactionList";
import {FiSkipBack} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface Transaction1 {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    icon: string;
}

const Transaction = () => {
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction1[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("/data/transactions.json");
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }
                const data = await response.json();
                setTransactions(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    const goBack = () => {
        router.back(); // This will navigate back to the previous page in the history stack
    };

    return (
        <div>
            <main className="flex-grow -mt-12 overflow-y-auto md:p-6 min-h-screen">
                <div className=" m-6  p-6 rounded-lg shadow-md relative w-6/8">
                    <div className="absolute m-3 top-0 left-0">
                        <button onClick={goBack} className="p-3 rounded-[100%] bg-white text-blue-500 hover:text-blue-700">
                            <FiSkipBack className="text-[15px] font-bold"/>
                        </button>
                    </div>
                    <div className="absolute m-3 top-0 right-0">
                        <Link href="/profile" className="h-[15px] w-[15px] font-bold px-3 py-1 rounded-[100%] bg-white hover:bg-red-200 text-[20px] text-gray-500 hover:text-gray-700">
                            &times;
                        </Link>
                    </div>

                    <div className="flex flex-col mt-8 justify-center items-center md:flex-row ">
                        <TransactionInfoCard
                          title= "Total Earnings"
                          device="FCFA"
                          value={130000.00}
                          subtitle= "as of 01 November 2024"
                          type= "transactions"
                        />

                        <TransactionInfoCard
                          title= "Confirmed Earnings"
                          device="FCFA"
                          value={43000.00}
                          subtitle= "as of 01 November 2024"
                          type= "earnings"
                        />

                        <TransactionInfoCard
                          title= "Pending Earnings"
                          device="FCFA"
                          value={50000.00}
                          subtitle= "as of 01 November 2024"
                          type= "payments"
                        />
                    </div>

                    <div className="mt-[20px]">
                        <div>
                            <TransactionList transactions={transactions} />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Transaction;

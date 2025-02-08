"use client";
import React, { useEffect, useState } from 'react';
import TransactionInfoCard from "@/components/TransactionInfoCard";
import TransactionList from "@/components/TransactionList";
import { TransactionProp} from "@/utils/types/HistoryProp";

const Transaction = () => {
    const [transactions, setTransactions] = useState<TransactionProp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("/data/transactions.json");
                console.log(response);
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

    return (
        <div>
            <main className="flex-grow overflow-y-auto p-6">
                <div className="flex flex-row w-full flex-wrap justify-center">
                    <TransactionInfoCard
                        title="Total Earnings"
                        device="FCFA"
                        value={130000.00}
                        subtitle="as of 01 November 2024"
                        type="transactions"
                    />
                    <TransactionInfoCard
                        title="Confirmed Earnings"
                        device="FCFA"
                        value={43000.00}
                        subtitle="as of 01 November 2024"
                        type="earnings"
                    />
                    <TransactionInfoCard
                        title="Pending Earnings"
                        device="FCFA"
                        value={50000.00}
                        subtitle="as of 01 November 2024"
                        type="payments"
                    />
                </div>
                <div className="ml-[25px] mt-[20px]">
                    <div>
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Transaction;

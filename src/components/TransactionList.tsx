import Image from "next/image";
import React, { useState } from "react";
import Transaction from '../app/(Organisation)/transactions/page';

interface Transaction {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    icon: string;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const statusColors: Record<string, string> = {
    pending: "bg-orange-background text-orange-text",
    confirmed: "bg-green-background text-green-text",
    canceled: "bg-red-background text-red-text",
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const [filter, setFilter] = useState<string>("all");

    // Fonction de filtrage
    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === "all") return true;
        return transaction.status === filter;
    });

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-primary-text">Payement History</h2>

            {/* Boutons de filtre */}
            <div className="flex space-x-4 mb-6">
                {["all", "pending", "confirmed", "canceled"].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded-[30px] font-medium text-sm ${
                            filter === status
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setFilter(status)}
                    >
                        {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Liste des transactions filtrées */}
            <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-6 rounded-[15px]">
                {filteredTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                    >
                        {/* Icone */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-primary-blue flex items-center justify-center overflow-hidden">
                                <div className="w-[80px] h-[80px] mt-[50px] ml-[10px]">
                                    {transaction.status === "confirmed" ? (
                                    <Image
                                        src="/transaction_types_icons_add.svg"
                                        alt={transaction.title}
                                        width={60}
                                        height={60}
                                    />
                                    ) : transaction.status === "pending" ? (
                                    <Image
                                        src="/transaction_types_icons_refresh.svg"
                                        alt={transaction.title}
                                        width={60}
                                        height={60}
                                    />
                                    ) : (
                                    <Image
                                        src="/transaction_types_icons.svg"
                                        alt={transaction.title}
                                        width={60}
                                        height={60}
                                    />
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-primary-text">{transaction.title}</h3>
                                <p className="text-xs text-secondary-text">{transaction.description}</p>
                                <p className="text-xs text-secondary-text">
                                    {transaction.date} • {transaction.time}
                                </p>
                            </div>
                        </div>

                        {/* Montant et statut */}
                        <div className="text-right">
                            <p className="text-sm font-semibold text-primary-text">{transaction.amount}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[transaction.status]}`}
                            >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message si aucune transaction ne correspond */}
            {filteredTransactions.length === 0 && (
                <p className="text-gray-500 text-center mt-6">No transactions found for  {filter} .</p>
            )}
        </div>
    );
};

export default TransactionList;

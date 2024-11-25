import React from "react";

interface Transaction {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    amount: string;
    status: "pending" | "confirmed" | "canceled";
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
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-primary-text">Recent Transactions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between bg-whitish-background p-4 rounded-lg shadow-sm"
                    >
                        {/* Icone */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-primary-blue flex items-center justify-center">
                                <img src={transaction.icon} alt={transaction.title} className="w-6 h-6" />
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
                {transaction.status}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;

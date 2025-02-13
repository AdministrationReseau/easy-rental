// import Image from "next/image";
// import React, { useState } from "react";
// import { TransactionListProps } from "@/utils/types/TransactionProps";
//
// const statusColors: Record<string, string> = {
//     pending: "bg-orange-background text-orange-text",
//     confirmed: "bg-green-background text-green-text",
//     canceled: "bg-red-background text-red-text",
// };
//
// const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
//     const [filter, setFilter] = useState<string>("all");
//
//     // Fonction de filtrage
//     const filteredTransactions = transactions.filter((transaction) => {
//         if (filter === "all") return true;
//         return transaction.status === filter;
//     });
//
//     return (
//         <div className="w-full">
//             <h2 className="text-xl font-semibold mb-4 text-primary-text">Payement History</h2>
//
//             {/* Boutons de filtre */}
//             <div className="flex mb-6 flex-col md:flex-row ">
//                 <div>
//                     {["all", "pending"].map((status) => (
//                         <button
//                             key={status}
//                             className={`my-2 mr-2 px-4 py-2 rounded-[30px] font-medium text-sm ${
//                                 filter === status
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-white text-black-100 hover:bg-gray-200"
//                             }`}
//                             onClick={() => setFilter(status)}
//                         >
//                             {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//
//                 <div>
//                     {["confirmed", "canceled"].map((status) => (
//                         <button
//                             key={status}
//                             className={`my-2 mr-2 px-4 py-2 rounded-[30px] font-medium text-sm ${
//                                 filter === status
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-white text-black-100 hover:bg-gray-200"
//                             }`}
//                             onClick={() => setFilter(status)}
//                         >
//                             {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//
//             </div>
//
//             {/* Liste des transactions filtrées */}
//             <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-6 rounded-[15px]">
//                 {filteredTransactions.map((transaction) => (
//                     <div
//                         key={transaction.id}
//                         className="flex items-center justify-between p-4 rounded-lg shadow-sm"
//                     >
//                         {/* Icone */}
//                         <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 rounded-lg bg-primary-blue flex items-center justify-center overflow-hidden">
//                                 <div className="w-[80px] h-[80px] mt-[50px] ml-[10px]">
//                                     {transaction.status === "confirmed" ? (
//                                     <Image
//                                         src="/transaction_types_icons_add.svg"
//                                         alt={transaction.title}
//                                         width={60}
//                                         height={60}
//                                     />
//                                     ) : transaction.status === "pending" ? (
//                                     <Image
//                                         src="/transaction_types_icons_refresh.svg"
//                                         alt={transaction.title}
//                                         width={60}
//                                         height={60}
//                                     />
//                                     ) : (
//                                     <Image
//                                         src="/transaction_types_icons.svg"
//                                         alt={transaction.title}
//                                         width={60}
//                                         height={60}
//                                     />
//                                     )}
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <h3 className="text-sm font-medium text-primary-text">{transaction.title}</h3>
//                                 <p className="text-xs text-secondary-text">{transaction.description}</p>
//                                 <p className="text-xs text-secondary-text">
//                                     {transaction.date} • {transaction.time}
//                                 </p>
//                             </div>
//                         </div>
//
//                         {/* Montant et statut */}
//                         <div className="text-right">
//                             <p className="text-sm font-semibold text-primary-text">{transaction.amount}</p>
//                             <span
//                                 className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[transaction.status]}`}
//                             >
//                 {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//               </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Message si aucune transaction ne correspond */}
//             {filteredTransactions.length === 0 && (
//                 <p className="text-gray-500 text-center mt-6">No transactions found for  {filter} .</p>
//             )}
//         </div>
//     );
// };
//
// export default TransactionList;


import Image from "next/image";
import React, { useState } from "react";
import { TransactionListProps } from "@/utils/types/TransactionProps";
import jsPDF from "jspdf";

const statusColors: Record<string, string> = {
    pending: "bg-orange-background text-orange-text",
    confirmed: "bg-green-background text-green-text",
    canceled: "bg-red-background text-red-text",
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const [filter, setFilter] = useState<string>("all");

    // Filter transactions based on the selected status
    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === "all") return true;
        return transaction.status === filter;
    });

    // Function to download transactions as a PDF file
    const downloadTransactionsAsPDF = () => {
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.setFontSize(18);
        doc.text(`Transaction History (${filter === "all" ? "All Transactions" : filter})`, 10, 10);

        // Set font size for transaction details
        doc.setFontSize(12);

        let yOffset = 20; // Start position below the title
        const lineHeight = 10; // Height of each line of text

        // Add transaction details to the PDF
        filteredTransactions.forEach((transaction) => {
            const transactionDetails = `
            ID: ${transaction.id}
            Title: ${transaction.title}
            Description: ${transaction.description}
            Date: ${transaction.date}
            Time: ${transaction.time}
            Amount: ${transaction.amount}
            Status: ${transaction.status}
        `;

            // Split the details into lines and add each line to the PDF
            transactionDetails.split('\n').forEach((line) => {
                doc.text(line, 10, yOffset);
                yOffset += lineHeight;
            });

            yOffset += lineHeight;
        });

        // Save the PDF
        doc.save(`transactions_${filter}.pdf`);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-primary-text">Payment History</h2>

            <div className="flex flex-row justify-between">
                {/* Filter Buttons */}
                <div className="flex mb-6 flex-col md:flex-row">
                    <div>
                        {["all", "pending"].map((status) => (
                            <button
                                key={status}
                                className={`my-2 mr-2 px-4 py-2 rounded-[30px] font-medium text-sm ${
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

                    <div>
                        {["confirmed", "canceled"].map((status) => (
                            <button
                                key={status}
                                className={`my-2 mr-2 px-4 py-2 rounded-[30px] font-medium text-sm ${
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
                </div>

                {/* Download as PDF Button */}
                <div className="">
                    <button
                        onClick={downloadTransactionsAsPDF}
                        className="bg-blue-500 text-white px-4 py-3 rounded-[10px] font-medium text-sm hover:bg-blue-700"
                    >
                        Download as PDF
                    </button>
                </div>
            </div>

            {/* Filtered Transactions List */}
            <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-6 rounded-[15px]">
                {filteredTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg shadow-sm"
                    >
                        {/* Icon */}
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

                        {/* Amount and Status */}
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

            {/* Message if no transactions are found */}
            {filteredTransactions.length === 0 && (
                <p className="text-gray-500 text-center mt-6">No transactions found for {filter}.</p>
            )}
        </div>
    );
};

export default TransactionList;
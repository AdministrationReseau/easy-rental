import React from "react";

interface CardData {
    title: string;
    device?: string,
    value: number;
    subtitle: string;
    type: "earnings" | "payments" | "transactions"; // Pour définir le comportement
    icon?: React.ReactNode;
}

const TransactionInfoCard: React.FC<CardData> = ({ title,device, value, subtitle, type }) => {
    let bgColor = "bg-white";

    if (type === "earnings") {
        bgColor = Number(value) >= 0 ? 'green-background' : "bg-red-100";
    } else if (type === "payments") {
        bgColor = "orange-background";
    } else if (type === "transactions") {
        bgColor = "white";
    }

    return (
        <div
            className={`flex items-center justify-between p-4 rounded-lg shadow-md bg-${bgColor} max-w-[500px] m-[10px] min-w-[100px] w-[100%] `}
        >
            <div>
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <p className="text-xl font-bold text-gray-800">{device?  value+ " "+ device: value}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
};

export default TransactionInfoCard;

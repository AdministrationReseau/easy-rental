"use client";
import React, { useState } from "react";
import { Home, CarRental, Insights, Mail, CalendarMonth, Settings, Logout } from "@mui/icons-material";
import Link from "next/link";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", icon: <Home />, link: "/" },
        { name: "Car Rent", icon: <CarRental />, link: "/car-rent" },
        { name: "Insight", icon: <Insights />, link: "/insight" },
        { name: "Inbox", icon: <Mail />, link: "/inbox" },
        { name: "Calendar", icon: <CalendarMonth />, link: "/calendar" },
        { name: "Settings", icon: <Settings />, link: "/settings" },
        { name: "Logout", icon: <Logout />, link: "/logout" },
    ];

    return (
        <div className={`bg-gray-100 h-screen transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} shadow-lg`}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-600 p-4 focus:outline-none hover:text-blue-500"
            >
                {isCollapsed ? "➕" : "➖"}
            </button>
            <ul className="mt-8">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 p-4 hover:bg-blue-100 cursor-pointer">
                        <span className="text-gray-600">{item.icon}</span>
                        {!isCollapsed && (
                            <Link href={item.link}>
                                <p className="text-gray-700">{item.name}</p>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

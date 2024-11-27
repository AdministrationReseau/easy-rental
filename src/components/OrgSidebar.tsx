"use client";

import React, { useState } from "react";
import {
    Home,
    DirectionsCar,
    AccountBalance,
    Person,
    LocationOn,
    AttachMoney,
    BarChart,
    Notifications,
    Subscriptions,
    Settings,
    Help,
    MenuOpen,
    Menu, Logout,
} from "@mui/icons-material";
import Link from "next/link";

const OrgSidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState<string>("Dashboard"); // Profile is active by default

    const mainMenuItems = [
        { name: "Dashboard", icon: <Home />, link: "/" },
        { name: "Agencies", icon: <AccountBalance />, link: "/agencies"},
        {name: "Cars", icon: <DirectionsCar />, link: "/cars"},
        { name: "Drivers", icon: <Person />, link: "/drivers" },
        { name: "Locations", icon: <LocationOn />, link: "/locations" },
        { name: "Transactions", icon: <AttachMoney />, link: "/transactions" },
        { name: "Statistics", icon: <BarChart />, link: "/statistics" },
        { name: "Notifications", icon: <Notifications />, link: "/notifications" },
    ];

    const preferenceItems = [
        { name: "Subscription", icon: <Subscriptions />, link: "/subscription" },
        { name: "Configuration", icon: <Settings />, link: "/configuration" },
        { name: "Help", icon: <Help />, link: "/help" },
    ];

    return (
        <div
            className={`bg-white h-screen transition-all duration-300 shadow-lg ${
                isCollapsed ? "w-20" : "w-64"
            } flex flex-col`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-secondary-text p-4 focus:outline-none hover:text-primary-blue"
            >
                {isCollapsed ? <MenuOpen /> : <Menu />}
            </button>

            {/* Main Menu Section */}
            <div className="mt-4">
                <h2
                    className={`text-secondary-text text-sm px-4 uppercase font-semibold ${
                        isCollapsed && "hidden"
                    }`}
                >
                    Dashboard Menu
                </h2>
                <ul>
                    {mainMenuItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveItem(item.name)}
                            className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
                                activeItem === item.name
                                    ? "bg-primary-blue text-white"
                                    : "hover:bg-gray-100 text-secondary-text"
                            }`}
                        >
                            <span
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                    activeItem === item.name
                                        ? "border-white bg-white text-primary-blue"
                                        : "border-gray-200 bg-white text-gray-200"
                                }`}
                            >
                                {item.icon}
                            </span>
                            {!isCollapsed && (
                                <Link href={item.link}>
                                    <p
                                        className={`transition-colors duration-200 ${
                                            activeItem === item.name
                                                ? "text-white"
                                                : "text-secondary-text"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mt-auto"></div>

            {/* Preferences Section */}
            <div className="mt-4">
                <h2
                    className={`text-secondary-text text-sm px-4 uppercase font-semibold ${
                        isCollapsed && "hidden"
                    }`}
                >
                    Preferences
                </h2>
                <ul>
                    {preferenceItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveItem(item.name)}
                            className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
                                activeItem === item.name
                                    ? "bg-primary-blue text-white"
                                    : "hover:bg-gray-100 text-secondary-text"
                            }`}
                        >
                            <span
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                    activeItem === item.name
                                        ? "border-white bg-white text-primary-blue"
                                        : "border-gray-200 bg-white text-gray-200"
                                }`}
                            >
                                {item.icon}
                            </span>
                            {!isCollapsed && (
                                <Link href={item.link}>
                                    <p
                                        className={`transition-colors duration-200 ${
                                            activeItem === item.name
                                                ? "text-white"
                                                : "text-secondary-text"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Section */}
            <div className="p-4">
                <button
                    onClick={() => setActiveItem("Log Out")}
                    className={`flex items-center gap-4 w-full cursor-pointer rounded-lg transition-all duration-200 ${
                        activeItem === "Log Out"
                            ? "bg-red-text text-white"
                            : "hover:bg-gray-100 text-red-text"
                    }`}
                >
                    <span
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                            activeItem === "Log Out"
                                ? "border-white bg-white text-red-text"
                                : "border-red-text bg-white text-red-text"
                        }`}
                    >
                        <Logout />
                    </span>
                    {!isCollapsed && <span>Log Out</span>}
                </button>
            </div>
        </div>
    );
};

export default OrgSidebar;

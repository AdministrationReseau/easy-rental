"use client";

import React, {useEffect, useState} from "react";
import {
    Home,
    DirectionsCar,
    AccountBalance,
    Person,
    LocationOn,
    AttachMoney,
    Notifications,
    Subscriptions,
    Settings,
    Help,
    MenuOpen,
    Menu,
    Logout,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrgSidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsCollapsed(false);
            } else {
                setIsCollapsed(true);
            }
        };

        // Running the function on initial load and on window resize
        handleResize();
        window.addEventListener("resize", handleResize);

        // Cleaning up the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mainMenuItems = [
        { name: "Dashboard", icon: <Home />, link: "/dashboard" },
        { name: "Agencies", icon: <AccountBalance />, link: "/agencies" },
        { name: "Vehicles", icon: <DirectionsCar />, link: "/cars" },
        { name: "Drivers", icon: <Person />, link: "/drivers" },
        { name: "Locations", icon: <LocationOn />, link: "/rentals" },
        { name: "Transactions", icon: <AttachMoney />, link: "/transactions" },
        { name: "Notifications", icon: <Notifications />, link: "/notifications" },
    ];

    const preferenceItems = [
        { name: "Subscription", icon: <Subscriptions />, link: "/subscription" },
        { name: "Configuration", icon: <Settings />, link: "/configuration" },
        { name: "Help", icon: <Help />, link: "/help" },
    ];

    const isActive = (link: string) =>  pathname.startsWith(link);

    return (
        <div
            className={`bg-white h-screen transition-all duration-300 shadow-lg ${
                isCollapsed ? "w-20" : "w-64"
            } flex flex-col`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-nowrap text-secondary-text p-3 mt-2 text-[18px] focus:outline-none hover:text-primary-blue"
            >
                {isCollapsed ? <Menu/> : <MenuOpen/>}
                {isCollapsed ? "" : "Dashboard" }
            </button>

            {/* Main Menu Section */}
            <div className="mt-4">
                <ul>
                    {mainMenuItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <li
                                className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
                                    isActive(item.link)
                                        ? "bg-primary-blue text-white  m-2"
                                        : "hover:bg-gray-100 hover:mx-2 text-secondary-text"
                                }`}
                            >
                                <span
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                        isActive(item.link)
                                            ? "border-white bg-white text-primary-blue"
                                            : "border-gray-200 bg-white text-gray-200"
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                {!isCollapsed && <p>{item.name}</p>}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Divider */}
            <div className="border-t bottom-0 border-gray-300 mt-auto"></div>

            {/* Preferences Section */}
            <div className="mt-1">
                <ul>
                    {preferenceItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <li
                                className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
                                    isActive(item.link)
                                        ? "bg-primary-blue text-white"
                                        : "hover:bg-gray-100 text-secondary-text"
                                }`}
                            >
                                <span
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                        isActive(item.link)
                                            ? "border-white bg-white text-primary-blue"
                                            : "border-gray-200 bg-white text-gray-200"
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                {!isCollapsed && <p>{item.name}</p>}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Logout Section */}
            <div className="p-4 bottom-0">
                <Link href="/">
                    <li
                        className={`flex items-center gap-4 w-full cursor-pointer rounded-lg transition-all duration-300 ${
                            isActive("/logout")
                                ? "bg-red-500 text-white"
                                : "hover:bg-gray-100 text-red-500"
                        }`}
                    >
                        <span
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                isActive("/logout")
                                    ? "border-white bg-white text-red-500"
                                    : "border-red-500 bg-white text-red-500"
                            }`}
                        >
                            <Logout/>
                        </span>
                        {!isCollapsed && <span>Log Out</span>}
                    </li>
                </Link>
            </div>
        </div>
    );
};

export default OrgSidebar;

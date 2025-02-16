"use client";

import React, {useEffect, useState} from "react";
import {
    Home,
    Favorite,
    LocationOn,
    AttachMoney,
    Settings,
    Notifications,
    Help,
    Logout,
    MenuOpen,
    Menu,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileSidebar: React.FC = () => {
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
        { name: "Profile", icon: <Home />, link: "/profile" },
        { name: "Favorite", icon: <Favorite />, link: "/profile/favorites" },
        { name: "Location", icon: <LocationOn />, link: "/profile/locations" },
        { name: "Transaction", icon: <AttachMoney />, link: "/profile/transactions" },
        { name: "Notification", icon: <Notifications />, link: "/profile/notifications" },
    ];

    const preferenceItems = [
        { name: "Settings", icon: <Settings />, link: "/profile/settings" },
        { name: "Help & Center", icon: <Help />, link: "/profile/help" },
    ];

    const isActive = (link: string) => pathname === link;

    return (
        <div
            className={`bg-white h-screen transition-all duration-300 shadow-lg ${
                isCollapsed ? "w-20" : "w-64"
            } flex flex-col`}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-secondary-text p-4 focus:outline-none hover:text-primary-blue"
            >
                {isCollapsed ? <MenuOpen /> : <Menu />}
            </button>

            {/* Main Menu Section */}
            <div className="mt-4">
                <ul>
                    {mainMenuItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <li
                                className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
                                    isActive(item.link)
                                        ? "bg-primary-blue text-white m-2"
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
                                {!isCollapsed && (
                                    <p
                                        className={`transition-colors duration-200 ${
                                            isActive(item.link)
                                                ? "text-white"
                                                : "text-secondary-text"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                )}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mt-auto"></div>

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
                                {!isCollapsed && (
                                    <p
                                        className={`transition-colors duration-200 ${
                                            isActive(item.link)
                                                ? "text-white"
                                                : "text-secondary-text"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                )}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Logout Section */}
            <div className="p-3">
                <Link href="/">
                    <button
                        className={`flex items-center gap-4 w-full cursor-pointer rounded-lg transition-all duration-200 ${
                            isActive("/")
                                ? "bg-red-text text-white"
                                : "hover:bg-gray-100 text-red-text"
                        }`}
                    >
                        <span
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                                isActive("/logout")
                                    ? "border-white bg-white text-red-text"
                                    : "border-red-text bg-white text-red-text"
                            }`}
                        >
                            <Logout />
                        </span>
                        {!isCollapsed && <span>Log Out</span>}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileSidebar;

import React from "react";
import { Search, Favorite, Notifications, Tune } from "@mui/icons-material";
import Link from "next/link";
import ImageProfile from "@/components/ImageProfile";

const NavOrg: React.FC = () => {
    return (
        <nav className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
            {/* Logo */}
            <Link href="/home">
                <p className="text-primary-blue font-bold text-lg">EASY-RENT</p>
            </Link>

            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full w-1/3 px-4">
                <Search className="text-gray-500 mt-2" />
                <input
                    type="text"
                    placeholder="Search something here"
                    className="flex-grow bg-transparent outline-none text-sm px-2 py-3 text-gray-700"
                />
                <Tune className="text-gray-500 cursor-pointer" />
            </div>
            <div className="flex items-center">
                <Link href="/customer" className="text-primary-blue font-bold text-lg">
                    Home
                </Link>
                <Link href="/customer/cars" className="text-primary-blue font-bold text-lg">
                    Cars
                </Link>
                <Link href="/customer/agencies" className="text-primary-blue font-bold text-lg">
                    Agencies
                </Link>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
                {/* Heart Icon */}
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Favorite className="text-primary-blue" />
                </button>

                {/* Notifications Icon */}
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Notifications className="text-primary-blue" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ImageProfile  imageUrl="/car2.png" width={40} height={40} />
                </div>
            </div>
        </nav>
    );
};

export default NavOrg;

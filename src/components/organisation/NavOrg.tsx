import React from "react";
import { Search, Notifications, Tune } from "@mui/icons-material";
import Link from "next/link";
import ImageProfile from "@/components/ImageProfile";

const NavOrg: React.FC = () => {
    return (
        <nav className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
            {/* Logo */}
            <Link href="/">
                <p className="text-primary-blue font-bold text-lg">EASY-RENT</p>
            </Link>

            {/* Search Bar */}
            <div className="flex justify-items-start bg-gray-100 rounded-full w-1/3 px-4">
                <Search className="text-gray-500 mt-3" />
                <input
                    type="text"
                    placeholder="Search something here"
                    className="flex-grow bg-transparent outline-none text-sm px-2 py-3 text-gray-700"
                />
                <Tune className="text-gray-500 cursor-pointer mt-3" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
                {/* Notifications Icon */}
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Notifications className="text-primary-blue" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                {/* Settings Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ImageProfile  imageUrl="/assets/car.png" width={40} height={40} />
                </div>
            </div>
        </nav>
    );
};

export default NavOrg;

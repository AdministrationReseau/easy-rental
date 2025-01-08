import React from "react";
import { Search, Favorite, Notifications, Tune } from "@mui/icons-material";
import Link from "next/link";
import ImageProfile from "@/components/ImageProfile";

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
            {/* Logo */}
            <Link href="/">
                <p className="text-primary-blue font-bold text-lg">EASY-RENT</p>
            </Link>

            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full w-1/3 px-4">
                <Search className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search something here"
                    className="flex-grow bg-transparent outline-none p-3 text-sm px-2 text-gray-700"
                />
                <Tune className="text-gray-500 cursor-pointer" />
            </div>

            <div className="flex flex-row text-[18px] text-secondary-text gap-4">
                <Link href="/customer" className="mr-4"> Home </Link>
                <Link href="/customer/cars" className="mr-4"> Cars </Link>
                <Link href="/customer/agencies" > Agencies </Link>
                <Link href="/customer/contact" > Contact </Link>
                <Link href="/customer/about" > About Us </Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/profile/favorites" >
                    <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                        <Favorite className="text-primary-blue" />
                    </button>
                </Link>

                <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Notifications className="text-primary-blue" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                {/* Settings Icon */}
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ImageProfile imageUrl="/assets/car.png" width={40} height={40} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

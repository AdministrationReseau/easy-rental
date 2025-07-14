"use client";

import React, { useState } from "react";
import { Search, Tune, Menu, Close  } from "@mui/icons-material";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import Link from "next/link";
import ImageProfile from "@/components/ImageProfile";

const NavOrg = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white py-4 px-6 shadow-md fixed sticky top-0 z-40">
            <div className="flex items-center justify-between">
                {/* Logo - Visible sur tous les écrans */}
                <Link href="/">
                    <p className="text-primary-blue font-bold text-lg">EASY-RENT</p>
                </Link>

             
                {/* Action Icons - Toujours visibles */}
                <div className="flex items-center gap-4">
                    <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200">
                        <CardMembershipIcon fontSize="large" color="primary" />
                    </button>

                    {/* Menu Hamburger uniquement sur mobile */}
                    <button
                        className="md:hidden text-gray-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <Close /> : <Menu />}
                    </button>

                    {/* Profile - Visible uniquement sur desktop */}
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                        <ImageProfile imageUrl="/assets/car.png" width={40} height={40} />
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    {/* Barre de recherche mobile */}
                    <div className="flex justify-items-start bg-gray-100 rounded-full px-4 mb-4">
                        <Search className="text-gray-500 mt-3" />
                        <input
                            type="text"
                            placeholder="Search something here"
                            className="flex-grow bg-transparent outline-none text-sm px-2 py-3 text-gray-700"
                        />
                        <Tune className="text-gray-500 cursor-pointer mt-3" />
                    </div>

                    {/* Profile mobile */}
                    <div className="flex justify-center pt-4 border-t">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <ImageProfile imageUrl="/assets/car.png" width={40} height={40} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavOrg;

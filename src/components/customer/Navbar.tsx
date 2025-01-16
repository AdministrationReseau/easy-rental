'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Close, Favorite, Notifications, Settings, Search, FilterList } from '@mui/icons-material'; // Import des icônes Material-UI
import DefaultProfile from "@/components/DefaultProfile";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Fonction pour basculer le menu mobile
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white text-primary shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto py-3 flex justify-between items-center gap-16">
                {/* Groupe 1 : Logo + Nom de l'application */}
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary-blue">
                        <Link href="/">Logo</Link>
                    </div>
                </div>

                {/* Groupe 2 : Barre de recherche + Menu principal */}
                {/* Barre de recherche */}
               {/* Barre de recherche */} 
                <div className="hidden md:flex items-center relative flex-grow">
                    <div className="relative flex w-[250px] max-w-[900px] items-center mx-auto">
                        <Search className="absolute left-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="absolute right-3 text-gray-500 hover:text-primary">
                            <FilterList />
                        </button>
                    </div>
                </div>



                <div className="flex-1 flex items-center justify-center w-[50%]">
                    {/* Menu principal */}
                    <ul className="hidden md:flex gap-5">
                        <li><Link href="#" className="hover:text-secondary-text transition">Home</Link></li>
                        <li><Link href="#" className="hover:text-secondary-text transition">About</Link></li>
                        <li><Link href="#" className="hover:text-secondary-text transition">Services</Link></li>
                        <li><Link href="/vehicles" className="hover:text-secondary-text transition">Vehicles</Link></li>
                        <li><Link href="#" className="hover:text-secondary-text transition">Pricing</Link></li>
                        <li><Link href="#" className="hover:text-secondary-text transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Groupe 3 : Icônes */}
                <div className="flex items-center gap-6">
                    <Favorite className="text-gray-500 cursor-pointer hover:text-secondary-text" />
                    <div className="relative">
                        <Notifications className="text-gray-500 cursor-pointer hover:text-secondary-text" />
                        <span className="absolute top-0 right-0 cursor-pointer bg-red-500 text-xs text-white rounded-full px-1">
                            5
                        </span>
                    </div>
                    <Settings className="text-gray-500 cursor-pointer hover:text-secondary-text" />
                    <span>
                        <Link href="#">
                            <DefaultProfile name="John Doe" />
                        </Link>
                    </span>
                </div>

                {/* Bouton Menu Hamburger (Mobile) */}
                <button onClick={toggleMenu} className="md:hidden text-gray-600">
                    {isOpen ? <Close className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <div className="md:hidden bg-white text-primary px-4 py-4">
                    {/* Barre de recherche (Mobile) */}
                    <div className="relative flex items-center mb-4">
                        <Search className="absolute left-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-20 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="absolute right-3 text-gray-500 hover:text-primary">
                            <FilterList />
                        </button>
                    </div>

                    {/* Liens du menu */}
                    <ul className="flex flex-col items-center gap-4">
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>Home</Link></li>
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>About</Link></li>
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>Services</Link></li>
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>Cars</Link></li>
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>Pricing</Link></li>
                        <li><Link href="#" className="hover:text-primary-light transition" onClick={toggleMenu}>Contact</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Close, Favorite, Notifications, Settings } from '@mui/icons-material'; // Import des icônes Material-UI
import Image from 'next/image'; // Pour afficher une image dans le profil

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Fonction pour basculer le menu mobile
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-primary-blue text-white shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link href="/">Logo</Link>
                </div>

                {/* Menu principal (Desktop) */}
                <ul className="hidden md:flex gap-6 items-center">
                    <li>
                        <Link href="#" className="hover:text-gray-300 transition">Home</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:text-gray-300 transition">About</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:text-gray-300 transition">Services</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:text-gray-300 transition">Cars</Link>
                    </li> <li>
                        <Link href="#" className="hover:text-gray-300 transition">Princing</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:text-gray-300 transition">Contact</Link>
                    </li>

                    {/* Icones supplémentaires */}
                    <li className="flex items-center gap-2">
                        {/* Like */}
                        <Favorite className="text-red-500 cursor-pointer" />
                    </li>
                    <li className="relative flex items-center gap-2">
                        {/* Notifications */}
                        <Notifications className="text-white cursor-pointer" />
                        <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">5</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {/* Paramètres */}
                        <Settings className="text-white cursor-pointer" />
                    </li>
                    <li className="flex items-center gap-2">
                        {/* Profil */}
                        <Link href="#">
                            <img
                                src="personne (2).png" // Remplacez avec le chemin vers l'image
                                alt="Profil"
                                width={32}
                                height={32}
                                className="rounded-full bg-white cursor-pointer w-[40px] h-[40px]"
                            />
                        </Link>
                    </li>
                </ul>

                {/* Bouton Menu Hamburger (Mobile) */}
                <button onClick={toggleMenu} className="md:hidden">
                    {isOpen ? (
                        <Close className="w-7 h-7 text-white" />
                    ) : (
                        <Menu className="w-7 h-7 text-white" />
                    )}
                </button>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <div className="md:hidden bg-primary-blue text-white">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Pricing
                            </Link>
                        </li>
                        
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Cars
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>

                        {/* Icones supplémentaires pour mobile */}
                        <li className="flex items-center gap-2">
                            Fav<Favorite className="text-red-500 cursor-pointer" />
                        </li>
                        <li className="relative flex items-center gap-2">
                            <Notifications className="text-white cursor-pointer" />
                            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">5</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Settings className="text-white cursor-pointer" />
                        </li>
                        <li className="flex items-center gap-2">
                            <Link href="#">
                                <img
                                    src="personne (2).png" 
                                    alt="Profil"
                                    width={32}
                                    height={32}
                                    className="rounded-full cursor-pointer"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

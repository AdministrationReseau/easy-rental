'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Close } from '@mui/icons-material'; // Import des icônes pour le menu hamburger

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
                        <Link href="/" className="hover:text-gray-300 transition">Accueil</Link>
                    </li>
                    <li>
                        <Link href="/services" className="hover:text-gray-300 transition">Services</Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-gray-300 transition">À propos</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
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
                            <Link href="/" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                À propos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-300 transition" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

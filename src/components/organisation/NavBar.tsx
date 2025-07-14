"use client";

import React, { useState } from "react";
import { Search, Favorite, Notifications, Tune, Menu, Close, AccountCircleRounded } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {FaCar} from "react-icons/fa";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isLinkActive = (href: string) => pathname.startsWith(href)

    const navLinks = [
        { href: "/customer/home", label: "Home" },
        { href: "/customer/cars", label: "Vehicles" },
        { href: "/customer/agencies", label: "Agencies" },
        { href: "/customer/contact", label: "Contact" },
        { href: "/customer/about", label: "About Us" },
    ];

    return (
        <nav className="bg-white py-2 px-6 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div className="flex items-center">
                        <FaCar className="text-primary-blue mr-2 text-2xl" />
                        <span className="text-primary-text text-xl font-bold">EASY-RENT</span>
                    </div>
                </Link>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden md:flex flex-row font-semibold text-secondary-text gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${
                                isLinkActive(link.href)
                                        ? "text-primary-blue border-b-2 border-primary-blue"
                                    : "hover:text-primary-blue"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icons - Partially visible on mobile */}
                <div className="flex items-center gap-4">
                    {/* Favorites - Desktop only */}
                    <Link href="/profile/favorites" className="hidden md:block">
                        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <Favorite className={isLinkActive("/profile/favorites") ? "text-primary-blue" : "text-secondary-text"} />
                        </button>
                    </Link>

                    {/* Notifications - Always visible */}
                    <Link href="/profile/notifications">
                        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <Notifications className={isLinkActive("/profile/notifications") ? "text-primary-blue" : "text-secondary-text"} />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
                        </button>
                    </Link>

                    {/* Menu Hamburger - Mobile only */}
                    <button
                        className="md:hidden text-gray-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <Close /> : <Menu />}
                    </button>

                    {/* Profile - Desktop only */}
                    <Link href="/profile" className="hidden md:block">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <AccountCircleRounded className={isLinkActive("/profile") || isLinkActive("/src/app/(customer)/profile") ? "text-primary-blue" : "text-secondary-text"} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${
                                    isLinkActive(link.href)
                                        ? "text-primary-blue border-b-2 border-primary-blue"
                                        : "hover:text-primary-blue"
                                } pb-1`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Additional Icons */}
                    <div className="flex flex-row items-center gap-4 mt-4 pt-4 border-t">
                        <Link href="/profile/favorites">
                            <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                                <Favorite className={isLinkActive("/profile/favorites") ? "text-primary-blue" : "text-secondary-text"} />
                            </button>
                        </Link>

                        <Link href="/profile" className="">
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                                <AccountCircleRounded className={isLinkActive("/profile") || isLinkActive("/src/app/(customer)/profile") ? "text-primary-blue" : "text-secondary-text"} />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

"use client";

import React, { useState } from "react";
import { Search, Favorite, Notifications, Tune, Menu, Close } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageProfile from "@/components/ImageProfile";

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
        <nav className="bg-white py-4 px-6 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <p className="text-primary-blue font-bold text-lg">EASY-RENT</p>
                </Link>

                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-full w-1/3 px-4">
                    <Search className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search something here"
                        className="flex-grow bg-transparent outline-none p-3 text-sm px-2 text-gray-700"
                    />
                    <Tune className="text-gray-500 cursor-pointer" />
                </div>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden md:flex flex-row text-[18px] text-secondary-text gap-4">
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
                            <Favorite className="text-primary-blue" />
                        </button>
                    </Link>

                    {/* Notifications - Always visible */}
                    <Link href="/profile/notifications">
                        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <Notifications className="text-primary-blue" />
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
                    <Link href="/profile/page" className="hidden md:block">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                            <ImageProfile imageUrl="/assets/car.png" width={40} height={40} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    {/* Mobile Search */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 mb-4">
                        <Search className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search something here"
                            className="flex-grow bg-transparent outline-none p-3 text-sm px-2 text-gray-700"
                        />
                        <Tune className="text-gray-500 cursor-pointer" />
                    </div>

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
                    <div className="flex items-center justify-around mt-4 pt-4 border-t">
                        <Link href="/profile/favorites">
                            <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                                <Favorite className="text-primary-blue" />
                            </button>
                        </Link>

                        <Link href="/profile/home">
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ImageProfile imageUrl="/assets/car.png" width={40} height={40} />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

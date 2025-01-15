import React from "react";
import { JakartaRegular, JakartaBold, JakartaSemiBold } from "@/fonts";
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className={`${JakartaRegular.className} min-h-[120px] bg-white py-8 px-4 border-t border-gray-200`}>
            <div className="container mx-auto flex flex-col space-y-8 lg:space-y-0 lg:flex-row justify-between items-start lg:items-center">
                {/* Left Section */}
                <div className="w-full lg:w-1/3 space-y-4">
                    <h2 className={`text-2xl md:text-3xl text-blue-600 ${JakartaBold.className}`}>
                        Easy Rent
                    </h2>
                    <p className="text-sm md:text-base text-gray-500">
                        Our vision is to provide convenience and help increase your sales
                        business.
                    </p>
                </div>

                {/* Center and Right Sections */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full lg:w-2/3">
                    {/* About */}
                    <div>
                        <h3 className={`text-lg md:text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>
                            About
                        </h3>
                        <ul className="space-y-2 text-sm md:text-base text-gray-500">
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    How it works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Featured
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Partnership
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Business Relation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className={`text-lg md:text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>
                            Community
                        </h3>
                        <ul className="space-y-2 text-sm md:text-base text-gray-500">
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Podcast
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors">
                                    Invite a friend
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Socials with Icons */}
                    <div>
                        <h3 className={`text-lg md:text-xl text-gray-800 mb-4 ${JakartaSemiBold.className}`}>
                            Socials
                        </h3>
                        <ul className="space-y-2 text-sm md:text-base text-gray-500">
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors flex items-center gap-2">
                                    <LinkedIn className="w-5 h-5" /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors flex items-center gap-2">
                                    <Instagram className="w-5 h-5" /> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors flex items-center gap-2">
                                    <Twitter className="w-5 h-5" /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800 transition-colors flex items-center gap-2">
                                    <Facebook className="w-5 h-5" /> Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Uncommented and Improved */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-6 space-y-4 md:space-y-0">
                <p className="text-sm text-gray-500">
                    ©2024 Easy Rent. All rights reserved
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Privacy & Policy
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        Terms & Condition
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

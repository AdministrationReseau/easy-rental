'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import ClientNavbar from "@/components/navbar/ClientNavbar"; // Changed import
import Footer from "@/components/Footer";
// import { BonusProvider } from "@/context/BonusContext";

export default function ProfileLayout({children }: { children: React.ReactNode }) { // Renamed component
    return (
        <>
            {/* <BonusProvider> */}
                <ClientNavbar/> {/* Changed Navbar component */}
                {/* The main content area needs to start below the fixed navbar.
                    pt-16 (padding-top: 4rem) is typically used if navbar height is h-16 (4rem).
                    The flex container itself will also need this padding if the sidebar isn't under the navbar.
                    Assuming sidebar should also be under the navbar.
                */}
                <div className="flex pt-16 h-screen"> {/* Added pt-16 here */}
                    <div className="w-1/7"> {/* Consider if sidebar needs its own pt-16 or if it's part of the scrollable area */}
                        <ProfileSidebar/>
                    </div>

                    {/* Removed mt-16 from here as pt-16 is on parent now */}
                    <div className="flex flex-col bg-gray-100 flex-grow w-6/7 overflow-y-auto">
                        {children}
                    </div>
                </div>
        
                <Footer />
            {/* </BonusProvider> */}
        </>
    )
}

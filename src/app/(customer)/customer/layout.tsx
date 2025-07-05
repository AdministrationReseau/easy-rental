'use client';

import React from "react";
import ClientNavbar from "@/components/navbar/ClientNavbar"; // Changed import
import Footer from "@/components/Footer";

export default function CustomerLayout({ children }: { children: React.ReactNode }) { // Renamed component
    return (
        <>
            <div className="flex flex-col flex-grow bg-whitish-background min-h-screen"> {/* Ensured min-h-screen */}
                <ClientNavbar /> {/* Changed Navbar component */}

                {/* pt-16 to account for fixed navbar height */}
                <main className="flex-grow p-6 pt-16">
                    {children}
                </main>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

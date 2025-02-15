'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            <div className="flex h-screen">
                <ProfileSidebar/>

                <div className="flex flex-col flex-grow">

                    <div className="flex-grow bg-gray-100 p-4 md:p-6">
                        {children}
                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}

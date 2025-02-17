'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";
// import { BonusProvider } from "@/context/BonusContext";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <BonusProvider> */}
                <NavBar/>
                <div className="flex h-screen">
                    <div className="w-1/7">
                        <ProfileSidebar/>
                    </div>

                    <div className="flex flex-col bg-gray-100 flex-grow mt-16 w-6/7 overflow-y-auto">
                        {children}
                    </div>

                </div>
            {/* </BonusProvider> */}
        </>
    )
}

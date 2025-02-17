'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            <div className="flex h-screen">
                <div className="w-1/7">
                    <ProfileSidebar/>
                </div>

                <div className="flex flex-col bg-gray-100 flex-grow mt-16 w-6/7">
                    {children}
                </div>

            </div>
        </>
    )
}

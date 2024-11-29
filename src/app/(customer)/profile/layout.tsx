'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen">
                <ProfileSidebar/>

                <div className="flex flex-col flex-grow">
                    <NavBar/>

                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

'use client';

import React from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavBar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen">
                <ProfileSidebar/>

                <div className="flex flex-col flex-grow">
                    <NavBar/>

                    <div className="flex-grow overflow-y-auto bg-[F6F7F9] p-6">
                        {children}
                    </div>

                    {/*<Footer/>*/}
                </div>
            </div>
        </>
    )
}

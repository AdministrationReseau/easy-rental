'use client';

import React from "react";
import NavBar from "@/components/organisation/NavBar";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col flex-grow bg-whitish-background h-full">
                <NavBar />

                <main className="flex-grow p-6 mt-16">
                    {children}
                </main>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

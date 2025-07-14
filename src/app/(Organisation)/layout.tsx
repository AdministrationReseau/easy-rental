'use client';

import React from "react";
import OrganizationSidebar from "@/components/sidebar/OrganizationSidebar";
import NavOrg from "@/components/organisation/NavOrg";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex h-screen flex-col">
                <NavOrg/>
                <div className="flex h-[calc(100vh-60px)]">
                    <OrganizationSidebar/>
                    <main className="w-full md:ml-64 pb-[70px] md:pb-0 overflow-y-auto">
                        <div className="p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
